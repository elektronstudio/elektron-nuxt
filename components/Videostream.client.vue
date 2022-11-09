<script setup lang="ts">
import { useFullscreen, useIdle } from "@vueuse/core";

type Props = {
  url: string;
  controls?: boolean;
};
const { url, controls = false } = defineProps<Props>();

const video = ref<HTMLVideoElement | null>(null);
const videoWrapper = ref(null);

useVideostream(video, url);

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(videoWrapper);
const { isPip, toggle: togglePip } = usePip(video);

const muted = ref(true);

const { idle } = useIdle(5000);
</script>

<template>
  <div class="VideoStream" ref="videoWrapper">
    <video
      ref="video"
      :muted="muted"
      :controls="mobile ? mobile : controls"
      autoplay
      playsinline
      crossorigin="anonymous"
      loop
    />

    <div class="controls">
      <div>
        <slot />
      </div>
      <nav>
        <button @click="muted = !muted">
          <Icon v-if="muted" name="radix-icons:speaker-off" />
          <Icon v-if="!muted" name="radix-icons:speaker-loud" />
        </button>
        <button @click="togglePip">
          <Icon v-if="isPip" name="ph:picture-in-picture" />
          <Icon v-if="!isPip" name="ph:picture-in-picture-fill" />
        </button>
        <button @click="toggleFullscreen">
          <Icon v-if="isFullscreen" name="radix-icons:enter-full-screen" />
          <Icon v-if="!isFullscreen" name="radix-icons:exit-full-screen" />
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.VideoStream {
  position: relative;
  display: flex;
  align-items: center;
  background-color: black;
}

.VideoStream video {
  width: 100%;
}

.controls {
  position: absolute;
  padding: var(--p-2);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  bottom: 0;
  opacity: 1;
}
.controls:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  height: 3rem;
  transition: 0.3s ease-in-out;
}
.controls > * {
  position: relative;
  z-index: 1;
}
.controls nav {
  display: flex;
  gap: var(--gap-2);
  /* opacity: 1; */
  /* transition: opacity 0.3s ease-in-out; */
}

/* .idle .controls {
  opacity: 0;
} */
.controls nav button {
  width: 1rem;
  height: 1rem;
  color: white;
  display: flex;
}
.controls .EButton svg {
  margin: 0;
}
.idle .isMaximised .controls {
  opacity: 0;
}
.isMaximised .controls {
  bottom: var(--p-8);
  right: var(--p-4);
}

.videoStream.isFullScreen video {
  height: 100%;
  object-fit: contain;
}
</style>
