<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vuepress/client'
import { useLocale } from '../composables/useLocale.js'

const { currentLocale } = useLocale()

interface LocaleStrings {
  loading: string
  waitingFirstSync: string
  unknown: string
  unknownError: string
  noGroupsTitle: string
  noGroupsMsg: (limit: number) => string
  lastSync: string
  groupId: string
  memberCount: string
  copyGroupId: string
  copied: string
  copyFailed: string
  viewAllGroups: string
  fullOrUnavailable: string
  groupName: (id: string) => string
  dateLocale: string
  numberLocale: string
}

const t = computed<LocaleStrings>(() => {
  const strings: Record<import('../composables/useLocale.js').Locale, LocaleStrings> = {
    zh: {
      loading: '正在获取 QQ 群信息...',
      waitingFirstSync: '等待首次更新',
      unknown: '未知',
      unknownError: '未知错误',
      noGroupsTitle: '暂时没有可加入的 QQ 群',
      noGroupsMsg: (limit: number) => `当前没有人数低于 ${limit} 的群，或群信息还未完成同步。请稍后再试。`,
      lastSync: '最近同步',
      groupId: '群号',
      memberCount: '当前人数',
      copyGroupId: '复制群号',
      copied: '已复制',
      copyFailed: '复制失败',
      viewAllGroups: '查看全部群状态',
      fullOrUnavailable: '已满或不可加入',
      groupName: (id: string) => `QQ群 ${id}`,
      dateLocale: 'zh-CN',
      numberLocale: 'zh-CN',
    },
    en: {
      loading: 'Fetching QQ group info...',
      waitingFirstSync: 'Waiting for first sync',
      unknown: 'Unknown',
      unknownError: 'Unknown error',
      noGroupsTitle: 'No QQ groups available',
      noGroupsMsg: (limit: number) => `No groups with fewer than ${limit} members available, or group data has not synced yet. Please try again later.`,
      lastSync: 'Last Sync',
      groupId: 'Group ID',
      memberCount: 'Members',
      copyGroupId: 'Copy Group ID',
      copied: 'Copied',
      copyFailed: 'Copy Failed',
      viewAllGroups: 'View All Groups',
      fullOrUnavailable: 'Full or Unavailable',
      groupName: (id: string) => `QQ Group ${id}`,
      dateLocale: 'en-US',
      numberLocale: 'en-US',
    },
    ja: {
      loading: 'QQ グループ情報を取得中...',
      waitingFirstSync: '初回同期待ち',
      unknown: '不明',
      unknownError: '不明なエラー',
      noGroupsTitle: '現在参加可能な QQ グループはありません',
      noGroupsMsg: (limit: number) => `現在、人数が ${limit} 未満のグループがないか、グループ情報の同期が完了していません。しばらくしてからもう一度お試しください。`,
      lastSync: '最終同期',
      groupId: 'グループID',
      memberCount: '現在の人数',
      copyGroupId: 'グループIDをコピー',
      copied: 'コピー済み',
      copyFailed: 'コピー失敗',
      viewAllGroups: '全グループの状態を表示',
      fullOrUnavailable: '満員または参加不可',
      groupName: (id: string) => `QQグループ ${id}`,
      dateLocale: 'ja-JP',
      numberLocale: 'ja-JP',
    },
  }
  return strings[currentLocale.value]
})

interface QQGroup {
  group_id: string
  group_name?: string
  member_count?: number
  max_member_count?: number
  ok?: boolean
  joinable?: boolean
  error?: string
}

interface QQGroupData {
  updated_at?: string
  member_limit?: number
  selected_group_id?: string | null
  groups?: QQGroup[]
}

const loading = ref(true)
const errorMessage = ref('')
const groupData = ref<QQGroupData | null>(null)
const copiedGroupId = ref('')
const copyErrorGroupId = ref('')
let resetCopyFeedbackTimer: ReturnType<typeof setTimeout> | undefined

onBeforeUnmount(() => {
  clearCopyFeedbackTimer()
  copiedGroupId.value = ''
  copyErrorGroupId.value = ''
})

const groups = computed(() => groupData.value?.groups ?? [])
const selectedGroup = computed(() => {
  const selectedGroupId = groupData.value?.selected_group_id
  return groups.value.find((group) => group.group_id === selectedGroupId) ?? null
})
const memberLimit = computed(() => groupData.value?.member_limit ?? 2000)

const updatedAt = computed(() => {
  const value = groupData.value?.updated_at
  return value ? formatDate(value) : t.value.waitingFirstSync
})

onMounted(async () => {
  try {
    const response = await fetch(withBase(`/data/qq-group.json?t=${Date.now()}`), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().includes('json')) {
      throw new Error('群信息暂时不可用，请稍后重试')
    }

    groupData.value = await response.json()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t.value.unknownError
  } finally {
    loading.value = false
  }
})

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(t.value.dateLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatCount(value?: number): string {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString(t.value.numberLocale) : t.value.unknown
}

function hasMemberCount(group: QQGroup): boolean {
  return typeof group.member_count === 'number' && Number.isFinite(group.member_count)
}

function formatGroupMemberCount(group: QQGroup): string {
  if (!hasMemberCount(group)) return t.value.unknown

  const maxMemberCount = group.max_member_count ?? memberLimit.value
  return `${group.member_count}/${maxMemberCount}`
}

function hasFewRemainingSlots(group: QQGroup): boolean {
  if (!hasMemberCount(group)) return false

  const maxMemberCount = group.max_member_count ?? memberLimit.value
  return maxMemberCount - group.member_count! < 50
}

function formatGroupName(group: QQGroup): string {
  return group.group_name || t.value.groupName(group.group_id)
}

async function copyGroupId(groupId: string): Promise<void> {
  try {
    await copyText(groupId)
    copiedGroupId.value = groupId
    copyErrorGroupId.value = ''
  } catch {
    copiedGroupId.value = ''
    copyErrorGroupId.value = groupId
  }

  clearCopyFeedbackTimer()
  resetCopyFeedbackTimer = setTimeout(() => {
    copiedGroupId.value = ''
    copyErrorGroupId.value = ''
    resetCopyFeedbackTimer = undefined
  }, 2000)
}

function clearCopyFeedbackTimer(): void {
  if (resetCopyFeedbackTimer === undefined) return

  clearTimeout(resetCopyFeedbackTimer)
  resetCopyFeedbackTimer = undefined
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Fall back for browsers that expose the Clipboard API but deny access.
    }
  }

  copyTextWithFallback(value)
}

function copyTextWithFallback(value: string): void {
  if (typeof document.execCommand !== 'function') {
    throw new Error('Clipboard API is not supported')
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) {
    throw new Error('Copy failed')
  }
}

function copyButtonLabel(groupId: string): string {
  if (copiedGroupId.value === groupId) return t.value.copied
  if (copyErrorGroupId.value === groupId) return t.value.copyFailed
  return t.value.copyGroupId
}
</script>

<template>
  <section class="qq-group">
    <div v-if="loading" class="qq-group__state">{{ t.loading }}</div>

    <div v-else-if="!selectedGroup" class="qq-group__empty">
      <h2>{{ t.noGroupsTitle }}</h2>
      <p class="qq-group__error">
        {{ errorMessage || t.noGroupsMsg(memberLimit) }}
      </p>
      <p class="qq-group__meta">{{ t.lastSync }}：{{ updatedAt }}</p>
    </div>

    <div v-else class="qq-group__content">
      <div class="qq-group__main">
        <h2>{{ formatGroupName(selectedGroup) }}</h2>

        <dl class="qq-group__stats">
          <div>
            <dt>{{ t.groupId }}</dt>
            <dd>{{ selectedGroup.group_id }}</dd>
          </div>
          <div>
            <dt>{{ t.memberCount }}</dt>
            <dd>{{ formatCount(selectedGroup.member_count) }} / {{ formatCount(selectedGroup.max_member_count) }}</dd>
          </div>
          <div>
            <dt>{{ t.lastSync }}</dt>
            <dd>{{ updatedAt }}</dd>
          </div>
        </dl>

        <button class="qq-group__button" type="button" @click="copyGroupId(selectedGroup.group_id)">
          {{ copyButtonLabel(selectedGroup.group_id) }}
        </button>
      </div>
    </div>

    <details v-if="groups.length > 1" class="qq-group__details">
      <summary>{{ t.viewAllGroups }}</summary>
      <ul>
        <li v-for="group in groups" :key="group.group_id">
          <span>
            {{ formatGroupName(group) }}
            <small>{{ group.group_id }}</small>
          </span>
          <span class="qq-group__details-actions">
            <strong
              v-if="hasMemberCount(group)"
              :class="{ 'qq-group__details-count--warning': hasFewRemainingSlots(group) }"
            >
              {{ formatGroupMemberCount(group) }}
            </strong>
            <em v-else>{{ group.error || t.fullOrUnavailable }}</em>
            <button type="button" @click="copyGroupId(group.group_id)">
              {{ copyButtonLabel(group.group_id) }}
            </button>
          </span>
        </li>
      </ul>
    </details>
  </section>
</template>

<style scoped>
.qq-group {
  min-width: 0;
  margin: 32px 0;
  padding: 28px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.qq-group__state,
.qq-group__empty {
  min-width: 0;
  color: var(--vp-c-text-2);
}

.qq-group__error {
  max-height: 8em;
  overflow: auto;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.qq-group__empty h2,
.qq-group__content h2 {
  margin: 0 0 10px;
  font-size: 1.55rem;
  line-height: 1.3;
}

.qq-group__content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.qq-group__main {
  min-width: 0;
}

.qq-group__eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 700;
}

.qq-group__hint,
.qq-group__meta {
  color: var(--vp-c-text-2);
}

.qq-group__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 20px 0;
}

.qq-group__stats div {
  min-width: 0;
}

.qq-group__stats dt {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.qq-group__stats dd {
  margin: 4px 0 0;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.qq-group__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 8px;
  border: 0;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
}

.qq-group__button:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}

.qq-group__details {
  margin-top: 24px;
}

.qq-group__details summary {
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.qq-group__details ul {
  display: grid;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.qq-group__details li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.qq-group__details span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.qq-group__details small {
  display: block;
  margin-top: 2px;
  color: var(--vp-c-text-3);
  font-size: 0.85em;
}

.qq-group__details strong {
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.qq-group__details-count--warning {
  color: var(--vp-c-danger-1) !important;
}

.qq-group__details em {
  min-width: 0;
  color: var(--vp-c-text-3);
  font-style: normal;
  overflow-wrap: anywhere;
}

.qq-group__details-actions {
  display: flex;
  min-width: 0;
  gap: 12px;
  align-items: center;
}

.qq-group__details-actions button {
  padding: 3px 10px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
}

.qq-group__details-actions button:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 640px) {
  .qq-group {
    padding: 20px;
  }

  .qq-group__content {
    display: block;
  }

  .qq-group__stats {
    grid-template-columns: 1fr;
  }

  .qq-group__details li {
    display: block;
  }

  .qq-group__details strong,
  .qq-group__details em {
    margin-top: 0;
  }

  .qq-group__details-actions {
    margin-top: 6px;
  }
}
</style>
