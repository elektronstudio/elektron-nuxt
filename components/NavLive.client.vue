<script setup lang="ts">
import { Urgency } from "~~/types";

const {
  data: event,
  formattedStartAtDistance,
  urgency,
  error,
} = await useUpcomingEvent();
const { lang } = useLang();

const playerState = ref<boolean>(false);
const audio = ref<HTMLAudioElement>();

watch(playerState, (playerState) => {
  const audioElement = audio.value;
  if (!audioElement) return;

  if (!playerState) {
    audioElement.src = "";
  } else {
    audioElement.src = event.value.radioUrl;
    audioElement.load();
    audioElement.play();
  }
});
</script>

<template>
  <template v-if="event && event.radioUrl">
    <button
      class="NavLive menuItem"
      :class="{ isLive: urgency?.value === 'now' }"
      @click="playerState = !playerState"
    >
      <Icon :name="!playerState ? 'radix-icons:play' : 'radix-icons:stop'" />
      <span>Radio: </span>
      <span class="eventTitle">{{ event.titles[lang] }}</span>
    </button>
    <audio class="AudioPlayer" ref="audio" controls preload="none" />
  </template>
  <NuxtLink
    v-else-if="event"
    class="NavLive menuItem"
    :to="event.eventLiveLink || event.eventLink"
    :class="{ isLive: urgency?.value === 'now' && event.haslive }"
  >
    <a>
      <span v-if="formattedStartAtDistance?.value && urgency?.value !== 'now'">
        {{ formattedStartAtDistance.value }}:
      </span>
      <span v-else-if="urgency?.value === 'now' && !event.haslive">
        {{ ["Happening now", "Praegu käimas"][lang] }}:
      </span>
      <span v-else-if="urgency?.value === 'now'">
        {{ ["Live now", "Live"][lang] }}:
      </span>
      <span class="eventTitle">{{ event.titles[lang] }}</span>
    </a>
  </NuxtLink>
</template>

<style scoped>
.NavLive {
  display: inline;
  overflow: hidden;
  background-color: var(--bg);
  margin-top: calc(var(--border-DEFAULT) * -1);
  text-align: left;
}
.NavLive {
  display: flex;
  gap: 0.2em;
}
.NavLive > span:not(.eventTitle) {
  flex-shrink: 0;
}

.eventTitle {
  color: var(--fg);
}
.NavLive.isLive {
  color: var(--bg);
  background-color: var(--gray-200);
}
.NavLive.isLive:hover {
  background-color: var(--gray-100);
}
.NavLive.isLive .eventTitle {
  color: var(--bg);
}
@media only screen and (max-width: 599px) {
  .NavLive {
    border-top: none;
    width: 100%;
    order: 99;
  }
}
@media only screen and (min-width: 600px) {
  .NavLive {
    width: 20rem;
    padding: var(--p-1);
    margin-top: 0;
  }
}
@media only screen and (min-width: 1000px) {
  .NavLive {
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
}
@media only screen and (min-width: 1240px) {
  .NavLive {
    width: 26rem;
  }
}

/* TODO: how to inherit this from Nav */
.menuItem {
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

.menuItem svg {
  width: 1em;
  height: 1em;
}

.AudioPlayer {
  display: none;
}
</style>
