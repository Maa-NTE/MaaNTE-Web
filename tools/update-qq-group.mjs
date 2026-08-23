import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

class RateLimitError extends Error {
  name = 'RateLimitError'
}

const GROUP_IDS = ['1103323319', '1101147419', '1075143235', '1106448578', '423431800', '836136969']
const API_SOURCES = createApiSources()
const DEFAULT_MEMBER_LIMIT = 2000
const rawMemberLimit = Number(process.env.QQ_GROUP_MEMBER_LIMIT)
const MEMBER_LIMIT = Number.isFinite(rawMemberLimit) ? rawMemberLimit : DEFAULT_MEMBER_LIMIT
const rawRequestDelay = Number(process.env.QQ_GROUP_REQUEST_DELAY_MS)
const REQUEST_DELAY_MS = Number.isFinite(rawRequestDelay) ? rawRequestDelay : 350
const rawRequestTimeout = Number(process.env.QQ_GROUP_REQUEST_TIMEOUT_MS)
const REQUEST_TIMEOUT_MS = Number.isFinite(rawRequestTimeout) ? rawRequestTimeout : 10_000
const DEFAULT_GROUP_BATCH_SIZE = 3
const rawGroupBatchSize = Number(process.env.QQ_GROUP_BATCH_SIZE)
const GROUP_BATCH_SIZE = Number.isInteger(rawGroupBatchSize) && rawGroupBatchSize > 0
  ? rawGroupBatchSize
  : DEFAULT_GROUP_BATCH_SIZE
const rawGroupBatchDelay = Number(process.env.QQ_GROUP_BATCH_DELAY_MS)
const GROUP_BATCH_DELAY_MS = Number.isFinite(rawGroupBatchDelay) && rawGroupBatchDelay >= 0
  ? rawGroupBatchDelay
  : 60_000
const MAX_RETRY_COUNT = 2
const sourceNextRequestAt = new WeakMap()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = process.env.QQ_GROUP_OUTPUT
  ? path.resolve(process.env.QQ_GROUP_OUTPUT)
  : path.resolve(__dirname, '../docs/.vuepress/public/data/qq-group.json')

function createApiSources(env = process.env) {
  const sources = []

  if (env.QQ_GROUP_INFO_API) {
    sources.push({
      name: 'configured API',
      baseUrl: env.QQ_GROUP_INFO_API,
      queryParam: env.QQ_GROUP_INFO_QUERY_PARAM || 'id',
      ckey: env.QQ_API_KEY || '',
      keyParam: env.QQ_GROUP_INFO_KEY_PARAM || 'key',
      unwrap: unwrapGroupResponse,
    })
  }

  sources.push({
    name: 'UAPI',
    baseUrl: env.QQ_GROUP_INFO_FALLBACK_API || 'https://uapis.cn/api/v1/social/qq/groupinfo',
    queryParam: env.QQ_GROUP_INFO_FALLBACK_QUERY_PARAM || 'group_id',
    unwrap: unwrapGroupResponse,
  })

  return sources
}

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
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (response.ok) {
      try {
        return normalizeGroup(groupId, source.unwrap(await readJsonResponse(response)))
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

async function readJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? ''
  const body = await response.text()

  if (!contentType.toLowerCase().includes('json')) {
    throw new Error(`expected JSON, received ${describeContentType(contentType, body)}`)
  }

  try {
    return JSON.parse(body)
  } catch {
    throw new Error('invalid JSON response')
  }
}

function describeContentType(contentType, body) {
  if (/^\s*<!doctype html|^\s*<html/i.test(body)) return 'HTML'
  return contentType.split(';', 1)[0] || 'an unknown content type'
}

function unwrapGroupResponse(response) {
  if (response?.code === undefined) {
    return response
  }

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
  const responseGroupId = String(data.group_id ?? groupId)

  if (memberCount === undefined) {
    throw new Error('Invalid response: missing member_count')
  }

  if (responseGroupId !== groupId) {
    throw new Error(`Invalid response: requested group ${groupId}, received ${responseGroupId}`)
  }

  if (maxMemberCount !== undefined && memberCount > maxMemberCount) {
    throw new Error(`Invalid response: member_count ${memberCount} exceeds max_member_count ${maxMemberCount}`)
  }

  return {
    ok: true,
    group_id: responseGroupId,
    group_name: toOptionalString(data.group_name),
    member_count: memberCount,
    max_member_count: maxMemberCount,
  }
}

function toOptionalString(value) {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function toNumber(value) {
  if (value === null || value === undefined || value === '') return undefined

  const numberValue = Number(value)
  return Number.isInteger(numberValue) && numberValue >= 0 ? numberValue : undefined
}

function compareGroups(left, right) {
  const leftCount = typeof left.member_count === 'number' ? left.member_count : Number.POSITIVE_INFINITY
  const rightCount = typeof right.member_count === 'number' ? right.member_count : Number.POSITIVE_INFINITY
  return leftCount - rightCount || String(left.group_id).localeCompare(String(right.group_id))
}

async function fetchGroupsInBatches(
  groupIds,
  previousGroups,
  {
    batchSize = GROUP_BATCH_SIZE,
    batchDelayMs = GROUP_BATCH_DELAY_MS,
    fetchGroupFn = fetchGroup,
    sleepFn = sleep,
  } = {},
) {
  const groups = []

  for (let offset = 0; offset < groupIds.length; offset += batchSize) {
    const batchIds = groupIds.slice(offset, offset + batchSize)
    const batchGroups = await Promise.all(batchIds.map(async (groupId) => {
      try {
        return await fetchGroupFn(groupId)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        const previousGroup = previousGroups.get(groupId)

        return previousGroup
          ? { ...previousGroup, stale: true, error: message }
          : { ok: false, group_id: groupId, error: message }
      }
    }))

    groups.push(...batchGroups)

    if (offset + batchSize < groupIds.length) {
      await sleepFn(batchDelayMs)
    }
  }

  return groups
}

async function main() {
  const previousOutput = await readPreviousOutput()
  const previousGroups = new Map(
    (previousOutput?.groups ?? [])
      .filter((group) => group?.ok && typeof group.group_id === 'string')
      .map((group) => [group.group_id, group]),
  )
  const groups = await fetchGroupsInBatches(GROUP_IDS, previousGroups)

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
}

function isJoinable(group) {
  return Boolean(group.ok && !group.stale && typeof group.member_count === 'number' && group.member_count < MEMBER_LIMIT)
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

async function readPreviousOutput() {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8'))
  } catch {
    return null
  }
}

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMainModule) {
  await main()
}

export { createApiSources, fetchGroupsInBatches, isJoinable, normalizeGroup }
