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
  <div class="relative flex items-center bg-black" ref="videoWrapper">
    <video
      ref="video"
      :muted="muted"
      :controls="mobile ? mobile : controls"
      autoplay
      playsinline
      crossorigin="anonymous"
      loop
      class="w-full"
    />

    <div class="controls">
      <div>
        <slot />
      </div>
      <nav>
        <EButton size="xs" color="transparent" @click="muted = !muted">
          <Icon v-if="muted" name="radix-icons:speaker-off" />
          <Icon v-if="!muted" name="radix-icons:speaker-loud" />
        </EButton>
        <EButton size="xs" color="transparent" @click="togglePip">
          <Icon v-if="isPip" name="ph:picture-in-picture" />
          <Icon v-if="!isPip" name="ph:picture-in-picture-fill" />
        </EButton>
        <EButton size="xs" color="transparent" @click="toggleFullscreen">
          <Icon v-if="isFullscreen" name="radix-icons:enter-full-screen" />
          <Icon v-if="!isFullscreen" name="radix-icons:exit-full-screen" />
        </EButton>
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

.controls {
  position: absolute;
  padding: var(--p-2);
  display: flex;
  justify-content: space-between;
  width: 100%;
  bottom: 0;
  opacity: 1;
  transition: 0.3s ease-in-out;
}
.controls nav {
  gap: var(--gap-2);
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
