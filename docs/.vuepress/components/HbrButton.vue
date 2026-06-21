<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <div
    class="hbr-btn"
    :class="{ 'has-children': children && children.length > 0, 'is-secondary': resolvedTheme === 'alt' }"
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
      class="hbr-btn-sub"
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

/* Sub-buttons: floating below parent, centered, wraps on narrow viewports */
.hbr-btn-sub {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: max-content;
  max-width: calc(100vw - 16px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s, visibility 0s 0.15s;
}

.hbr-btn-sub::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: -8px;
  right: -8px;
  height: 10px;
}

.hbr-btn:hover > .hbr-btn-sub,
.hbr-btn:focus-within > .hbr-btn-sub {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 0.15s, visibility 0s 0s;
}

/* Narrow screens: anchor from left edge to avoid centering overflow */
@media (max-width: 480px) {
  .hbr-btn-sub {
    left: 8px;
    transform: none;
    justify-content: flex-start;
  }
}

.hbr-btn-sub :deep(.vp-button) {
  margin-left: 0;
}
</style>
