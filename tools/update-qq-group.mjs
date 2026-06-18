import { mkdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const GROUP_IDS = ['1103323319', '1101147419', '1075143235', '713114598', '1106448578', '423431800', '836136969']
const DEFAULT_PRIMARY_REQUEST_INTERVAL_MS = 21_000
const rawPrimaryRequestInterval = Number(process.env.QQ_GROUP_INFO_PRIMARY_INTERVAL_MS)
const PRIMARY_REQUEST_INTERVAL_MS = Number.isFinite(rawPrimaryRequestInterval)
  ? rawPrimaryRequestInterval
  : DEFAULT_PRIMARY_REQUEST_INTERVAL_MS
const API_SOURCES = [
  {
    name: 'self-hosted API',
    baseUrl: process.env.QQ_GROUP_INFO_API ?? 'http://api.maante.org/apidata',
    queryParam: 'id',
    ckey: process.env.QQ_API_KEY ?? '',
    keyParam: 'key',
    minIntervalMs: PRIMARY_REQUEST_INTERVAL_MS,
    unwrap: unwrapPrimaryResponse,
  },
  {
    name: 'fallback API',
    baseUrl: process.env.QQ_GROUP_INFO_FALLBACK_API ?? 'https://www.tmini.net/api/group?type=',
    queryParam: 'qq',
    ckey: process.env.QQ_API_KEY ?? '',
    keyParam: 'ckey',
    unwrap: unwrapPrimaryResponse,
  },
]
const DEFAULT_MEMBER_LIMIT = 2000
const rawMemberLimit = Number(process.env.QQ_GROUP_MEMBER_LIMIT)
const MEMBER_LIMIT = Number.isFinite(rawMemberLimit) ? rawMemberLimit : DEFAULT_MEMBER_LIMIT
const REQUEST_DELAY_MS = 350
const MAX_RETRY_COUNT = 2
const sourceNextRequestAt = new WeakMap()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = process.env.QQ_GROUP_OUTPUT
  ? path.resolve(process.env.QQ_GROUP_OUTPUT)
  : path.resolve(__dirname, '../docs/.vuepress/public/data/qq-group.json')

async function fetchGroup(groupId) {
  const errors = []

  for (const source of API_SOURCES) {
    try {
      return await fetchGroupFromSource(groupId, source)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`${source.name}: ${message}`)
    }
  }

  throw new Error(`Failed to fetch group ${groupId} (${errors.join('; ')})`)
}

async function fetchGroupFromSource(groupId, source) {
  const url = new URL(source.baseUrl)
  url.searchParams.set(source.queryParam, groupId)
  if ('ckey' in source && source.ckey) {
    url.searchParams.set(source.keyParam ?? 'ckey', source.ckey)
  }

  for (let retryCount = 0; retryCount <= MAX_RETRY_COUNT; retryCount += 1) {
    await waitForSourceRateLimit(source)

    const response = await fetch(url, {
      headers: { accept: 'application/json', ...source.headers },
    })

    if (response.ok) {
      try {
        return normalizeGroup(groupId, source.unwrap(await response.json()))
      } catch (error) {
        if (!isRateLimitError(error) || retryCount === MAX_RETRY_COUNT) {
          throw error
        }

        await sleep(getRetryDelayMs(source, retryCount))
        continue
      }
    }

    if (response.status !== 429 || retryCount === MAX_RETRY_COUNT) {
      throw new Error(`HTTP ${response.status}`)
    }

    await sleep(REQUEST_DELAY_MS * (retryCount + 2))
  }

  throw new Error('Request retries exhausted')
}

function unwrapPrimaryResponse(response) {
  if (response?.code === 219) {
    throw new RateLimitError(`API rate limited: ${response.msg ?? 'too many requests'}`)
  }

  if (response?.code !== 200 || !response.data) {
    throw new Error(`API error: ${response?.msg ?? 'invalid response'}`)
  }

  return response.data
}

function normalizeGroup(groupId, data) {
  const memberCount = toNumber(data.member_count)
  const maxMemberCount = toNumber(data.max_member_count)

  if (memberCount === undefined) {
    throw new Error('Invalid response: missing member_count')
  }

  return {
    ok: true,
    group_id: String(data.group_id ?? groupId),
    group_name: toOptionalString(data.group_name),
    member_count: memberCount,
    max_member_count: maxMemberCount,
  }
}

function toOptionalString(value) {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function toNumber(value) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function compareGroups(left, right) {
  const leftCount = typeof left.member_count === 'number' ? left.member_count : Number.POSITIVE_INFINITY
  const rightCount = typeof right.member_count === 'number' ? right.member_count : Number.POSITIVE_INFINITY
  return leftCount - rightCount || String(left.group_id).localeCompare(String(right.group_id))
}

const groups = []

for (const groupId of GROUP_IDS) {
  try {
    groups.push(await fetchGroup(groupId))
  } catch (error) {
    groups.push({
      ok: false,
      group_id: groupId,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  await sleep(REQUEST_DELAY_MS)
}

groups.sort(compareGroups)
groups.forEach((group) => {
  group.joinable = isJoinable(group)
})

const candidates = groups.filter((group) => group.joinable)

const selected = candidates[0] ?? null
const output = {
  updated_at: new Date().toISOString(),
  member_limit: MEMBER_LIMIT,
  selected_group_id: selected?.group_id ?? null,
  groups,
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(`${outputPath}.tmp`, `${JSON.stringify(output, null, 2)}\n`, 'utf8')
await rename(`${outputPath}.tmp`, outputPath)

if (selected) {
  console.log(`Selected QQ group ${selected.group_id} with ${selected.member_count} members.`)
} else {
  console.log(`No QQ group below ${MEMBER_LIMIT} members was found.`)
}

function isJoinable(group) {
  return Boolean(group.ok && typeof group.member_count === 'number' && group.member_count < MEMBER_LIMIT)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForSourceRateLimit(source) {
  const minIntervalMs = source.minIntervalMs ?? 0
  if (minIntervalMs <= 0) return

  const now = Date.now()
  const nextRequestAt = sourceNextRequestAt.get(source) ?? 0
  if (now < nextRequestAt) {
    await sleep(nextRequestAt - now)
  }

  sourceNextRequestAt.set(source, Date.now() + minIntervalMs)
}

function getRetryDelayMs(source, retryCount) {
  return Math.max(source.minIntervalMs ?? 0, REQUEST_DELAY_MS * (retryCount + 2))
}

function isRateLimitError(error) {
  return error instanceof RateLimitError
}

class RateLimitError extends Error {
  name = 'RateLimitError'
}
