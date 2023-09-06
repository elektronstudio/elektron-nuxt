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
    return liveEvents.value.find((e: Event) => e.radioUrl);
  }
});

console.log("liveEvent", liveEvent.value);
</script>

<template>
  <div class="wrapper">
    <a href="https://elektron.art" class="homeButton">
      <ELogo el="span" />
    </a>
    <div class="player">
      <AudioPlayer v-if="liveEvent" :event="liveEvent" :urgency="urgency" />
      <h6 v-else class="event-title">No live radio</h6>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
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
  position: relative;
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

@media only screen and (max-width: 599px) {
  .homeButton {
    width: 100%;
  }
  .wrapper {
    flex-wrap: wrap;
  }
  .player {
    width: 100%;
    margin-top: -1px;
    flex-direction: column;
  }
}

@media only screen and (min-width: 600px) {
  .homeButton {
    min-width: 8rem;
  }
  .wrapper {
    flex-wrap: nowrap;
  }
  .player {
    flex: 1 1 0;
  }
}

@media only screen and (min-width: 1000px) {
  .homeButton {
    min-width: 10rem;
  }
}

.event-title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  color: var(--gray-300);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
