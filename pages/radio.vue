<script setup lang="ts">
import { Urgency } from "~~/types";
definePageMeta({
  layout: "radio",
});

const {
  data: event,
  formattedStartAtDistance,
  urgency,
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
  <div class="wrapper">
    <a href="https://elektron.art" class="homeButton">
      <ELogo el="span" />
    </a>
    <template v-if="urgency === 'now' && event.radioUrl">
      <div class="player">
        <h6 class="event-title">{{ event.titles[lang] }}</h6>
        <button
          class="play-button"
          :class="{ 'is-active': playerState }"
          @click="playerState = !playerState"
        >
          <Icon
            :name="!playerState ? 'radix-icons:play' : 'radix-icons:stop'"
          />
        </button>
      </div>
    </template>
    <div v-else class="player">
      <h2 class="event-title">No live radio</h2>
    </div>
  </div>
  <audio class="audio-player" ref="audio" controls preload="none" />
</template>

<style scoped>
.audio-player {
  display: none;
}

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

.play-button {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--h-9);
  height: var(--h-9);
  color: var(--gray-100);
  background: url("/images/bg-texture-xs.gif");
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.play-button.is-active {
  background: var(--accent);
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
