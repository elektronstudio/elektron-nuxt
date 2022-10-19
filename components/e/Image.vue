<script setup lang="ts">
import { MediaItem } from "~~/types";

type Props = {
  media: MediaItem;
};

const { media } = defineProps<Props>();
const { alternativeText, url, width, height, formats } = media;

const generateSrcSet = () => {
  const srcSet = [];

  for (const format in formats) {
    srcSet.push(
      `${(media.formats as any)[format].url} ${
        (formats as any)[format].width
      }w`,
    );
  }
  srcSet.push(`${url} ${width}w`);
  return srcSet.join(", ");
};
</script>

<template>
  <img
    ref="el"
    :src="url"
    :width="width"
    :height="height"
    :alt="alternativeText"
    :srcset="generateSrcSet()"
    loading="lazy"
    decoding="async"
    class="EImage"
  />
</template>

<style scoped>
.EImage {
  display: block;
  width: 100%;
}
</style>
