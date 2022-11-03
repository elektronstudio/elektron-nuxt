<script setup lang="ts">
type Props = {
  event: any;
};
const { event } = defineProps<Props>();
const { formattedDatetimeFirst, formattedDatetimeSecond } = useDatetime(
  event.start_at,
  event.end_at,
);
</script>

<template>
  <time class="EventDatetime">
    {{ formattedDatetimeFirst }}
    <span v-if="formattedDatetimeSecond">&nbsp;–&nbsp;</span>
    {{ formattedDatetimeSecond }}
  </time>
</template>

<style scoped>
.EventDatetime {
  display: flex;
  align-items: center;
  color: var(--gray-300);
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}
</style>
