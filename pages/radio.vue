<script setup lang="ts">
import { Event, Urgency } from "~~/types";

definePageMeta({
  layout: "radio",
});

const {
  data: event,
  formattedStartAtDistance,
  urgency,
  error,
} = await useUpcomingEvent();

const { data: liveEvents } = await useLiveEvents();

// TODO: Temp solution
const liveEvent = computed(() => {
  if (urgency.value === "now") {
    const firstRadio = liveEvents.value.find((e: Event) => e.radioUrl);
    return firstRadio || event.value;
  } else {
    return event.value;
  }
});
</script>

<template>
  <AudioPlayer v-if="liveEvent" :event="liveEvent" :urgency="urgency" />
</template>
