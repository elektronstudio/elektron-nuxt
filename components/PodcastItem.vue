<script setup lang="ts">
import { PodcastEpisode } from "~~/composables/podcast";
import { formatDatetime } from "~~/composables/datetime";

interface Props {
  episode: PodcastEpisode;
}
const { episode } = defineProps<Props>();
// const { theme } = useTheme();
const { lang } = useLang();
console.log(episode);
</script>

<template>
  <div class="PodcastItem">
    <img
      v-if="episode.itunes.image"
      :src="episode.itunes.image"
      class="thumbnail"
    />
    <div class="content">
      <ETitle el="h3">
        {{ episode.title }}
      </ETitle>
      <ETitle el="h5" size="sm">
        {{ formatDatetime(new Date(episode.isoDate)) }}
      </ETitle>
      <EContent>
        <div v-html="episode['content:encoded']" />
      </EContent>
      <audio class="audio" controls :src="episode.enclosure.url" />
    </div>
  </div>
</template>

<style scoped>
.PodcastItem {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: var(--m-6);
}
.thumbnail {
  max-width: 10rem;
  height: auto;
  justify-self: center;
  margin-bottom: var(--m-5);
}
.content h3,
.content .EContent {
  margin-bottom: var(--m-3);
}

.EContent {
  color: var(--gray-300);
  word-break: break-word;
}

.audio {
  max-width: 100%;
}

@media only screen and (min-width: 600px) {
  .PodcastItem {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-areas: "thumbnail content";
  }

  .thumbnail {
    grid-area: thumbnail;
    width: 100%;
    height: auto;
    margin: 0;
  }
  .content {
    grid-area: content;
    padding: 0 var(--p-5);
  }
}
</style>
