<script setup lang="ts">
type Props = {
  details: {
    detail: string;
    value: string;
  }[];
};

const { details } = defineProps<Props>();
</script>

<template>
  <ul class="EDetailsList">
    <li v-for="detail in details">
      <span v-if="detail[0]" v-html="detail[0]" />
      <span v-if="detail[1]" v-html="detail[1]" />
    </li>
  </ul>
</template>

<style scoped>
.EDetailsList {
  color: var(--gray-300);
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
  display: flex;
  flex-direction: column;
  gap: var(--gap-3);
}
.EDetailsList li {
  display: flex;
}
.EDetailsList li span:first-child {
  display: inline-block;
  min-width: 16ch;
  width: 16ch;
}
</style>
