<script setup lang="ts">
const {
  data,
  // error,
} = await _useUpcomingEvent();
const upcomingEvent = computed(() => {
  return data.value.filter((event) => {
    const { urgency } = useDatetime(event.start_at, event.end_at);
    return urgency.value === "soon" || urgency.value === "now";
  })[0];
});
</script>
<template>
  <div>
    <Nav :event="upcomingEvent" />
    <slot />
  </div>
</template>
