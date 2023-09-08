<script setup lang="ts">
import { Event, Urgency } from "~~/types";

type Props = {
  event?: Event | null;
  urgency: Urgency | null;
  className?: string;
};
const { event, urgency, className } = defineProps<Props>();

const { lang } = useLang();
const playerState = ref<boolean>(false);
const audio = ref<HTMLAudioElement>();

watch(playerState, (playerState) => {
  const audioElement = audio.value;
  if (!audioElement) return;

  if (!playerState) {
    audioElement.src = "";
  } else if (typeof event?.radioUrl === "string") {
    audioElement.src = event?.radioUrl;
    audioElement.load();
    audioElement.play();
  }
});
</script>

<template>
  <div
    v-if="urgency === 'now' && event?.radioUrl"
    class="audio-player"
    @click="playerState = !playerState"
  >
    <h6 class="event-title">{{ event.titles[lang] }}</h6>
    <button class="play-button" :class="{ 'is-active': playerState }">
      <Icon :name="!playerState ? 'radix-icons:play' : 'radix-icons:stop'" />
    </button>
  </div>
  <audio class="audio-player-audio" ref="audio" controls preload="none" />
</template>

<style scoped>
.audio-player {
  position: absolute;
  inset: 0;
  padding: var(--p-1) var(--p-3);
  padding-right: calc(var(--h-9) + var(--p-2));
  cursor: pointer;
}
.audio-player-audio {
  display: none;
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
  width: calc(var(--h-9) - 2px);
  height: calc(var(--h-9) - 2px);
  color: var(--gray-100);
  background-color: red;
  background: url("/images/bg-texture-xs.gif");
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

.play-button svg {
  width: 1rem;
  height: 1rem;
}

.play-button.is-active {
  background: var(--accent);
}

@media only screen and (min-width: 600px) {
  .audio-player {
    padding: var(--p-1);
    padding-right: calc(var(--h-9) + var(--p-2));
  }
}
</style>
