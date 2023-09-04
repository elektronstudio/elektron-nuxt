<script setup lang="ts">
import { Event, Urgency } from "~~/types";

const {
  data: event,
  formattedStartAtDistance,
  urgency,
  error,
} = await useUpcomingEvent();

const { data: liveEvents } = await useLiveEvents();

const { lang } = useLang();

const playerState = ref<boolean>(false);
const audio = ref<HTMLAudioElement>();

// TODO: Temp solution
const liveEvent = computed(() => {
  if (urgency.value === "now") {
    const firstRadio = liveEvents.value.find((e: Event) => e.radioUrl);
    return firstRadio || event.value;
  } else {
    return event.value;
  }
});

watch(playerState, (playerState) => {
  const audioElement = audio.value;
  if (!audioElement) return;

  if (!playerState) {
    audioElement.src = "";
  } else {
    audioElement.src = liveEvent.value.radioUrl;
    audioElement.load();
    audioElement.play();
  }
});
</script>

<template>
  <div v-if="liveEvent && liveEvent.radioUrl" class="nav-live">
    <AudioPlayer :event="liveEvent" :urgency="urgency" />
  </div>
  <NuxtLink
    v-else-if="liveEvent"
    class="nav-live menu-item"
    :to="liveEvent.eventLiveLink || liveEvent.eventLink"
    :class="{ isLive: urgency === 'now' && liveEvent.haslive }"
  >
    <a>
      <span v-if="formattedStartAtDistance?.value && urgency !== 'now'">
        {{ formattedStartAtDistance.value }}:
      </span>
      <span v-else-if="urgency === 'now' && !liveEvent.haslive">
        {{ ["Happening now", "Praegu käimas"][lang] }}:
      </span>
      <span v-else-if="urgency === 'now'">
        {{ ["Live now", "Live"][lang] }}:
      </span>
      <span class="event-title">{{ liveEvent.titles[lang] }}</span>
    </a>
  </NuxtLink>
</template>

<style scoped>
.nav-live {
  display: inline;
  overflow: hidden;
  background-color: var(--bg);
  margin-top: calc(var(--border-DEFAULT) * -1);
  text-align: left;
}
.nav-live {
  display: flex;
  gap: 0.2em;
}
.nav-live > span:not(.event-title) {
  flex-shrink: 0;
}

.event-title {
  color: var(--fg);
}
.nav-live.isLive {
  color: var(--bg);
  background-color: var(--gray-200);
}
.nav-live.isLive:hover {
  background-color: var(--gray-100);
}
.nav-live.isLive .event-title {
  color: var(--bg);
}
@media only screen and (max-width: 599px) {
  .nav-live {
    border-top: none;
    width: 100%;
    order: 99;
  }
}
@media only screen and (min-width: 600px) {
  .nav-live {
    width: 20rem;
    padding: var(--p-1);
    margin-top: 0;
  }
}
@media only screen and (min-width: 1000px) {
  .nav-live {
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
}
@media only screen and (min-width: 1240px) {
  .nav-live {
    width: 26rem;
  }
}

/* TODO: how to inherit this from Nav */
.menu-item {
  display: inline-flex;
  height: var(--h-9);
  padding: var(--p-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  color: var(--gray-300);
  border: var(--border-DEFAULT) solid var(--gray-500);
}

.menu-item svg {
  width: 1em;
  height: 1em;
}

.AudioPlayer {
  display: none;
}
</style>
