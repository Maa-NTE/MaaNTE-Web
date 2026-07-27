import assert from 'node:assert/strict'
import test from 'node:test'

import { createApiSources, isJoinable, normalizeGroup } from './update-qq-group.mjs'

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
  })

  assert.equal(sources.length, 2)
  assert.equal(sources[0].baseUrl, 'https://groups.example.test/info')
  assert.equal(sources[0].queryParam, 'id')
  assert.equal(sources[0].ckey, 'secret')
  assert.equal(sources[1].baseUrl, 'https://uapis.cn/api/v1/social/qq/groupinfo')
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
