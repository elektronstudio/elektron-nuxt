<script setup lang="ts">
const route = useRoute();

// 30 second interval to fetch new data
let interval;

const emit = defineEmits(["update-stream"]);

onMounted(() => {
  interval = setInterval(async () => {
    const slug = route.params.event_slug as string;
    const { data: event, error } = await useEventBySlug(slug as string, {
      fields: ["streamUrl"],
    });
    console.log(event.value);
    console.log(event.value.streamUrl);
    emit("update-stream", event.value.streamUrl);
  }, 30000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
