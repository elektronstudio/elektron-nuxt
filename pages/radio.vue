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
  <div class="wrapper">
    <a href="https://elektron.art" class="homeButton">
      <ELogo el="span" />
    </a>
    <div class="player">
      <AudioPlayer v-if="liveEvent" :event="liveEvent" :urgency="urgency" />
      <h2 v-else class="event-title">No live radio</h2>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100vw;
  max-width: 700px;
}

.player {
  display: flex;
  gap: var(--p-2);
  background-color: var(--bg);
  padding: var(--p-1);
  border: var(--border-DEFAULT) solid var(--gray-500);
  border-left: none;
  height: var(--h-9);
  padding-right: calc(var(--h-9) + var(--p-2));
  min-width: 0;
  flex: 1 1 0;
}

.homeButton {
  background-color: var(--bg);
  display: flex;
  flex-shrink: 0;
  color: var(--gray-300);
  padding: var(--p-1);
  border: var(--border-DEFAULT) solid var(--gray-500);
  height: var(--h-9);
}

@media only screen and (min-width: 600px) {
  .homeButton {
    min-width: 8rem;
  }
}

@media only screen and (min-width: 1000px) {
  .homeButton {
    min-width: 10rem;
  }
}
</style>
