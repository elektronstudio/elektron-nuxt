<script setup lang="ts">
import { MediaItem } from "~~/types";
type Props = {
  images: MediaItem[];
};

const { images } = defineProps<Props>();
</script>

<template>
  <section class="ImageSlider">
    <figure v-for="image in images">
      <EImage :media="image" />
    </figure>
  </section>
</template>

<style scoped>
.ImageSlider {
  display: flex;
  overflow-x: auto;
}

.ImageSlider figure {
  padding-left: var(--p-5);
  flex-shrink: 0;
}
.ImageSlider figure:last-child {
  padding-right: var(--p-5);
}

.ImageSlider figcaption {
  max-width: 16rem;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  line-height: var(--line-height-xs);
  color: var(--gray-300);
  margin-top: var(--m-4);
}

.ImageSlider .EImage {
  height: 70vw;
  width: auto;
  border-radius: var(--rounded-4xl);
}
@media only screen and (min-width: 600px) {
  .ImageSlider .EImage {
    height: 40vw;
  }
}
@media only screen and (min-width: 1000px) {
  .ImageSlider .EImage {
    height: 30vw;
  }
}
</style>
