<script setup lang="ts">
type Props = {
  layout?: "vertical" | "horizontal";
  cols?: number;
};

const { layout = "vertical", cols = 2 } = defineProps<Props>();
</script>

<template>
  <div class="EStack" :class="layout">
    <slot />
  </div>
</template>

<style>
.EStack {
  display: flex;
  flex-wrap: wrap;
}
.EStack.vertical {
  flex-direction: column;
}
.EStack.horizontal {
  flex-direction: row;
}
</style>
