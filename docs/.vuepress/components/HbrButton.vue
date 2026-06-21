<script setup lang="ts">
import { computed, ref, nextTick, onUnmounted } from 'vue'
import { VPButton } from 'vuepress-theme-plume/client'

interface ChildAction {
  text: string
  link?: string
  theme?: 'brand' | 'alt' | 'sponsor'
  type?: 'primary' | 'secondary'
  icon?: string
  suffixIcon?: string
  target?: string
  rel?: string
  children?: ChildAction[]
}

interface Props {
  text: string
  link?: string
  theme?: 'brand' | 'alt' | 'sponsor'
  type?: 'primary' | 'secondary'
  icon?: string
  suffixIcon?: string
  target?: string
  rel?: string
  size?: 'medium' | 'big'
  children?: ChildAction[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

function resolveTheme(t?: 'brand' | 'alt' | 'sponsor', type?: 'primary' | 'secondary'): 'brand' | 'alt' | 'sponsor' {
  if (t) return t
  if (type === 'secondary') return 'alt'
  return 'brand'
}

const resolvedTheme = computed(() => resolveTheme(props.theme, props.type))

const rootRef = ref<HTMLElement>()
const subRef = ref<HTMLElement>()
const subStyle = ref<Record<string, string>>({})
const anchorClass = ref('')

let cleanupScroll: (() => void) | null = null

function positionSubMenu() {
  const root = rootRef.value
  const sub = subRef.value
  if (!root || !sub) return

  const btn = root.getBoundingClientRect()
  const subRect = sub.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const GAP = 8
  const MARGIN = 8

  let left = btn.left + btn.width / 2 - subRect.width / 2
  left = Math.max(MARGIN, Math.min(left, vw - subRect.width - MARGIN))

  const aboveTop = btn.top - subRect.height - GAP
  const belowTop = btn.bottom + GAP

  if (aboveTop >= MARGIN) {
    anchorClass.value = 'sub-above'
    subStyle.value = {
      left: `${left - btn.left}px`,
      bottom: `${btn.height + GAP}px`,
      top: 'auto',
      transform: 'none',
    }
  } else {
    anchorClass.value = 'sub-below'
    subStyle.value = {
      left: `${left - btn.left}px`,
      top: `${btn.height + GAP}px`,
      bottom: 'auto',
      transform: 'none',
    }
  }
}

function onShow() {
  nextTick(() => {
    positionSubMenu()
    if (!cleanupScroll) {
      window.addEventListener('scroll', positionSubMenu, { passive: true })
      window.addEventListener('resize', positionSubMenu, { passive: true })
      cleanupScroll = () => {
        window.removeEventListener('scroll', positionSubMenu)
        window.removeEventListener('resize', positionSubMenu)
      }
    }
  })
}

function onHide() {
  setTimeout(() => {
    cleanupScroll?.()
    cleanupScroll = null
  }, 200)
}

onUnmounted(() => {
  cleanupScroll?.()
})
</script>

<template>
  <div
    ref="rootRef"
    class="hbr-btn"
    :class="{ 'has-children': children && children.length > 0, 'is-secondary': resolvedTheme === 'alt' }"
    @mouseenter="onShow"
    @focusin="onShow"
    @mouseleave="onHide"
    @focusout="onHide"
  >
    <VPButton
      v-bind="link ? { tag: 'a', href: link, target, rel } : {}"
      :size="size"
      :theme="resolvedTheme"
      :text="text"
      :icon="icon"
      :suffix-icon="suffixIcon"
    />
    <div
      v-if="children && children.length > 0"
      ref="subRef"
      class="hbr-btn-sub"
      :class="anchorClass"
      :style="subStyle"
    >
      <HbrButton
        v-for="child in children"
        :key="child.text"
        v-bind="child"
        size="medium"
      />
    </div>
  </div>
</template>

<style scoped>
.hbr-btn {
  position: relative;
  display: inline-flex;
}

/* Frosted glass + inner glow base style — 复用 hero name 的渐变色调 */
.hbr-btn :deep(.vp-button) {
  margin: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(96, 165, 250, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(96, 165, 250, 0.15),
    0 0 14px rgba(168, 85, 247, 0.12),
    0 0 28px rgba(59, 130, 246, 0.08);
  color: var(--vp-c-text-1);
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.35);
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.hbr-btn :deep(.vp-button:hover) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(96, 165, 250, 0.45);
  box-shadow:
    inset 0 1px 0 rgba(96, 165, 250, 0.25),
    0 0 24px rgba(168, 85, 247, 0.25),
    0 0 48px rgba(59, 130, 246, 0.14);
  color: var(--vp-c-text-1);
  text-shadow: 0 0 16px rgba(168, 85, 247, 0.5);
}

.hbr-btn :deep(.vp-button:active) {
  background: rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(168, 85, 247, 0.08);
}

/* Secondary: subtler than primary, but still visible with a clean outline */
.hbr-btn.is-secondary :deep(.vp-button) {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(96, 165, 250, 0.18);
  box-shadow: none;
  text-shadow: none;
}

.hbr-btn.is-secondary :deep(.vp-button:hover) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(96, 165, 250, 0.30);
  box-shadow:
    0 0 12px rgba(168, 85, 247, 0.10);
  text-shadow: 0 0 8px rgba(168, 85, 247, 0.20);
}

/* Sub-buttons: floating above parent, centered, wraps on narrow viewports */
.hbr-btn-sub {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: max-content;
  max-width: calc(100vw - 16px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.hbr-btn-sub::before {
  content: '';
  position: absolute;
  top: 100%;
  left: -8px;
  right: -8px;
  height: 10px;
}

.hbr-btn-sub.sub-below::before {
  top: auto;
  bottom: 100%;
}

.hbr-btn:hover > .hbr-btn-sub,
.hbr-btn:focus-within > .hbr-btn-sub {
  opacity: 1;
  pointer-events: auto;
}

.hbr-btn-sub :deep(.vp-button) {
  margin-left: 0;
}
</style>
