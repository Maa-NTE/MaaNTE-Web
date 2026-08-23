import assert from 'node:assert/strict'
import test from 'node:test'

import { createApiSources, fetchGroupsInBatches, isJoinable, normalizeGroup, parseJinaJson } from './update-qq-group.mjs'

test('uses the live public API by default', () => {
  const sources = createApiSources({})

  assert.equal(sources.length, 1)
  assert.equal(sources[0].baseUrl, 'https://uapis.cn/api/v1/social/qq/groupinfo')
  assert.equal(sources[0].queryParam, 'group_id')
})

test('keeps a configured self-hosted API ahead of the public fallback', () => {
  const sources = createApiSources({
    QQ_GROUP_INFO_API: 'https://groups.example.test/info',
    QQ_API_KEY: 'secret',
    QQ_GROUP_USE_CONFIGURED_API: 'true',
  })

  assert.equal(sources.length, 2)
  assert.equal(sources[0].baseUrl, 'https://groups.example.test/info')
  assert.equal(sources[0].queryParam, 'id')
  assert.equal(sources[0].ckey, 'secret')
  assert.equal(sources[1].baseUrl, 'https://uapis.cn/api/v1/social/qq/groupinfo')
})

test('uses only UAPI unless the configured API is explicitly enabled', () => {
  const sources = createApiSources({
    QQ_GROUP_INFO_API: 'https://groups.example.test/info',
    QQ_API_KEY: 'secret',
  })

  assert.equal(sources.length, 1)
  assert.equal(sources[0].name, 'UAPI')
})

test('parses JSON wrapped by the Jina reader', () => {
  assert.deepEqual(parseJinaJson('Title: QQ group\n\nMarkdown Content:\n{"group_id":"1","member_count":2}\n'), {
    group_id: '1',
    member_count: 2,
  })

  assert.deepEqual(parseJinaJson(JSON.stringify({
    code: 200,
    data: { content: '{"group_id":"2","member_count":3}' },
  })), {
    group_id: '2',
    member_count: 3,
  })
})

test('fetches three groups at a time with one delay between two batches', async () => {
  const events = []
  const groupIds = ['1', '2', '3', '4', '5', '6']
  let inFlight = 0
  let maxInFlight = 0

  const groups = await fetchGroupsInBatches(groupIds, new Map(), {
    batchSize: 3,
    batchDelayMs: 60_000,
    fetchGroupFn: async (groupId) => {
      inFlight += 1
      maxInFlight = Math.max(maxInFlight, inFlight)
      events.push(`fetch:${groupId}`)
      await new Promise((resolve) => setTimeout(resolve, 1))
      inFlight -= 1
      return { ok: true, group_id: groupId, member_count: Number(groupId) }
    },
    sleepFn: async (delayMs) => {
      events.push(`sleep:${delayMs}`)
    },
  })

  assert.deepEqual(events, [
    'fetch:1',
    'fetch:2',
    'fetch:3',
    'sleep:60000',
    'fetch:4',
    'fetch:5',
    'fetch:6',
  ])
  assert.equal(maxInFlight, 1)
  assert.deepEqual(groups.map((group) => group.group_id), groupIds)
})

test('normalizes a valid full group without marking it joinable', () => {
  const group = normalizeGroup('836136969', {
    group_id: '836136969',
    group_name: 'MaaNTE交流群7群',
    member_count: 2000,
    max_member_count: 2000,
  })

  assert.equal(group.member_count, 2000)
  assert.equal(isJoinable(group), false)
})

test('never selects stale member counts', () => {
  assert.equal(isJoinable({
    ok: true,
    stale: true,
    group_id: '836136969',
    member_count: 6,
    max_member_count: 2000,
  }), false)
})

test('rejects responses for a different group', () => {
  assert.throws(() => normalizeGroup('836136969', {
    group_id: '423431800',
    member_count: 100,
    max_member_count: 2000,
  }), /requested group 836136969, received 423431800/)
})

test('rejects missing and impossible member counts', () => {
  assert.throws(() => normalizeGroup('836136969', {
    group_id: '836136969',
    member_count: null,
    max_member_count: 2000,
  }), /missing member_count/)

  assert.throws(() => normalizeGroup('836136969', {
    group_id: '836136969',
    member_count: 2001,
    max_member_count: 2000,
  }), /exceeds max_member_count/)
})
