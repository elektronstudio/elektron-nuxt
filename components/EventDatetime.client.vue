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
    <Icon v-if="formattedDatetimeSecond" name="radix-icons:chevron-right" />
    {{ formattedDatetimeSecond }}
  </time>
</template>

<style scoped>
.EventDatetime {
  display: flex;
  align-items: center;
  color: var(--gray-300);
}
</style>
