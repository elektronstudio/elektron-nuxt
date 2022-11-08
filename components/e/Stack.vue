<script setup lang="ts">
type Props = {
  layout?: "vertical" | "horizontal";
  cols?: number;
  is?: string;
};

const { layout = "vertical", cols = 2, is = "div" } = defineProps<Props>();
</script>

<template>
  <component :is="is" class="EStack" :class="layout">
    <slot />
  </component>
</template>

<style>
.EStack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-4);
}
.EStack.vertical {
  flex-direction: column;
}
.EStack.horizontal {
  flex-direction: row;
}
</style>
