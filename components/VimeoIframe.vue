<script setup lang="ts">
import { onMounted, ref } from "vue";
import Player from "@vimeo/player";

type Props = {
  id: number;
};

const { id } = defineProps<Props>();

var options = {
  id,
};

onMounted(() => {
  var video01Player = new Player("vimeo-video", options);
});
</script>

<template>
  <div class="VideoStream">
    <div id="vimeo-video"></div>
  </div>
</template>

<style scoped>
.VideoStream {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: black;
}

#vimeo-video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

#vimeo-video :deep(iframe) {
  width: 100%;
  height: 100%;
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
