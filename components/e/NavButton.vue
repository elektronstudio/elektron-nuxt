<script setup lang="ts">
type Props = {
  variant?: "outline" | "transparent";
};

const { variant } = withDefaults(defineProps<Props>(), {
  variant: "transparent",
});
</script>

<template>
  <a class="ENavButton" :class="variant">
    <slot />
  </a>
</template>

<style scoped>
.ENavButton {
  display: inline-flex;
  align-items: center;
  padding: var(--p-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
}
/* TODO: sync with icon system */
.ENavButton.outline {
  border: var(--border-DEFAULT) solid var(--gray-500);
}
.ENavButton :deep(svg) {
  margin-right: var(--m-1);
  width: 1em;
  height: 1em;
}
.ENavButton:not(:first-child) {
  margin-left: calc(var(--border-DEFAULT) * -1);
}
.ENavButton:hover {
  border-image: url("/images/bg-texture-xs.gif") 1;
  z-index: 2;
}
</style>
