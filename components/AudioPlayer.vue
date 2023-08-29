<script setup lang="ts">
type Props = {
  streamUrl?: string | null;
};
const props = defineProps<Props>();
let { streamUrl } = toRefs(props);
const audio = ref<HTMLAudioElement>();

watch(
  streamUrl,
  (newUrl) => {
    console.log(newUrl);
    const audioElement = audio.value;
    if (!audioElement) return;

    if (!streamUrl) {
      audioElement.src = "";
    } else if (typeof newUrl === "string") {
      audioElement.src = newUrl;
      audioElement.load();
      audioElement.play();
    }
  },
  { immediate: true },
);
</script>

<template>
  <audio class="AudioPlayer" ref="audio" controls preload="none"></audio>
</template>

<style scoped>
.AudioPlayer {
  display: none;
}
</style>
