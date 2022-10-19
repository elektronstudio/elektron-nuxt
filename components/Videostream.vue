<script setup lang="ts">
// TODO: Move to elektro

import { computed, ref, watch } from "vue";
// Radix does not have PIP icons so we have to borrow them from Phospor set
import { plausible, stats, statsSynced, useMessage, usePip } from "@/utils";
import { debouncedWatch, useFullscreen } from "@vueuse/core";
import { breakpoints, useVideostream } from "elektro";

const { sendMessage } = useMessage();
const mobile = breakpoints.smaller("large");

type Props = {
  streamurl: any;
  streamkey: any;
  viewers: any;
};
const { streamurl, streamkey } = defineProps<Props>();

const viewers = computed(() => {
  const stat = stats.value.find((s: any) => s.streamkey === streamkey);
  //@ts-ignore
  return stat && stat.viewers ? stat.viewers : null;
});

const viewersSynced = computed(() => {
  const stat = statsSynced.value.find((s: any) => s.streamkey === streamkey);
  //@ts-ignore
  return stat && stat.viewers ? stat.viewers : null;
});

const sync = ref(1);
const syncStat = () => {
  sendMessage({
    type: "STATS_SYNC",
    channel: "elektron",
    value: `${streamkey}: ${sync.value}`,
  });
};

debouncedWatch(sync, () => syncStat(), { debounce: 100 });

const { videoRef, width, height, status } = useVideostream(streamurl);
const { isPipAvailable, isPip, enterPip, exitPip } = usePip(videoRef);
const videoWindowRef = ref<HTMLElement | null>(null);
const {
  isFullscreen,
  enter: enterFullscreen,
  exit: exitFullscreen,
} = useFullscreen(videoWindowRef);

const volume = ref(0);
const lastVolume = ref(0);
const initialMuted = ref(true);

const handleInitialUnmute = () => {
  initialMuted.value = false;
  volume.value = 0.8;
  lastVolume.value = 0.8;
};

const handleMuted = () => {
  if (volume.value == 0) {
    volume.value = lastVolume.value;
  } else {
    lastVolume.value = volume.value;
    volume.value = 0;
  }
};

watch(volume, () => {
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
  }
});

const trackedEnterPip = () => {
  enterPip();
  plausible.trackEvent("user_video_pip");
};

const trackedEnterFullscreen = () => {
  enterFullscreen();
  plausible.trackEvent("user_video_fullscreen");
};
</script>

<template>
  <div
    style="position: relative"
    ref="videoWindowRef"
    class="videoStream"
    :class="{ isFullScreen: isFullscreen }"
  >
    <video
      ref="videoRef"
      :muted="volume == 0"
      autoplay
      :controls="mobile"
      playsinline
      :width="width"
      :height="height"
      style="width: 100%"
    />
    <div
      style="
        position: absolute;
        bottom: var(--p-4);
        left: var(--p-4);
        display: flex;
        gap: var(--gap-2);
        align-items: center;
        font-size: 0.8em;
        opacity: 0.5;
      "
    >
      <Icon name="radix-icons:eye-open" v-if="viewersSynced" />
      <!-- <input style="background: black" v-model="sync" /> -->
      <div>{{ viewersSynced }}</div>
      <slot />
    </div>
    <div v-if="!mobile" class="controls">
      <EButton
        v-if="initialMuted"
        size="xs"
        color="transparent"
        @click="handleInitialUnmute()"
      >
        <Icon name="radix-icons:speaker-off" />
        Click to unmute
      </EButton>
      <template v-else>
        <EButton size="xs" color="transparent" @click="handleMuted">
          <Icon name="radix-icons:speaker-off" v-if="volume == 0" />
          <Icon name="radix-icons:speaker-loud" v-else />
        </EButton>
        <EFormRange v-model="volume" :max="1" step="any" />
      </template>
      <EButton
        v-if="status === 'playing' && isPipAvailable && !isPip"
        size="xs"
        color="transparent"
        @click="trackedEnterPip"
      >
        <Icon name="ph:picture-in-picture" />
      </EButton>
      <EButton
        v-if="status === 'playing' && isPipAvailable && isPip"
        size="xs"
        color="transparent"
        @click="exitPip"
      >
        <Icon name="icons/ph/picture-in-picture-fill" />
      </EButton>

      <EButton
        v-if="!isFullscreen"
        size="xs"
        color="transparent"
        @click="trackedEnterFullscreen"
      >
        <Icon name="radix-icons:enter-full-screen" />
      </EButton>
      <EButton
        v-if="isFullscreen"
        size="xs"
        color="transparent"
        @click="exitFullscreen"
      >
        <Icon name="radix-icons:exit-full-screen" />
      </EButton>
    </div>
  </div>
</template>

<style scoped>
.controls {
  position: absolute;
  bottom: var(--p-4);
  right: var(--p-4);
  display: flex;
  gap: var(--gap-2);
  opacity: 1;
  transition: 0.3s ease-in-out;
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
