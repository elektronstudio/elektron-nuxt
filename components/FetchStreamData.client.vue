<script setup lang="ts">
const route = useRoute();

// 30 second interval to fetch new data
let interval: ReturnType<typeof setInterval>;

const emit = defineEmits(["update-stream"]);

onUnmounted(() => {
  clearInterval(interval);
});

onMounted(() => {
  interval = setInterval(async () => {
    const slug = route.params.event_slug as string;
    const { data: event, error } = await useEventBySlug(slug as string, {
      fields: ["live"],
    });
    emit("update-stream", event.value.live);
  }, 30000);
});
</script>

<template></template>
