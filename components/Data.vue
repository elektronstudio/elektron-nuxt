<script setup lang="ts">
import { useElementSize } from "@vueuse/core";

type Props = {
  data: any;
};
const { data } = defineProps<Props>();

const el = ref(null);
const { width } = useElementSize(el);
const isWide = computed(() => width.value > 1000);
const formattedData = computed(() =>
  Object.entries(data)
    .map(
      ([key, value]) =>
        `<div class="cell key">${key}:</div><div class="cell ${
          isWide ? "isWide" : ""
        }">${value}</div>`,
    )
    .join(""),
);
</script>

<template>
  <div
    ref="el"
    v-html="formattedData"
    class="Data"
    :class="{ isWide: 'isWide' }"
  />
</template>

<style scoped>
.Data {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.75rem;
}
/* .Data.isWide {
  display: flex;
  flex-wrap: wrap;
  gap: var(--p-3);
} */
.Data :deep(.cell) {
  white-space: pre;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--gray-300);
}
.Data :deep(.cell.isWide) {
  padding-right: var(--p-3);
}
.Data :deep(.cell.key) {
  color: var(--gray-500);
}
</style>
