<script setup lang="ts">
import { MediaItem } from "~~/types";

type Props = {
  title: string;
  author?: string;
  media?: MediaItem;
  nextEvent?: any;
};

const { title, author, media, nextEvent } = defineProps<Props>();
</script>
<template>
  <ECard :media="media" class="ProjectCard">
    <template #header>
      <h3 class="ETitle lg" v-html="title" />
      <h6 v-if="author" v-html="author" />
    </template>
    <template #footer>
      <p v-if="nextEvent" class="next-event">Järgmine etendus:</p>
      <!-- <time v-if="nextEvent" :datetime="nextEvent">
        {{ nextEvent }}
      </time> -->
      <EventDatetime v-if="nextEvent" :event="nextEvent" />
    </template>
  </ECard>
</template>
<style scoped>
.ProjectCard footer,
.ProjectCard header h6 {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}
.ProjectCard header h3 {
  margin-bottom: var(--m-2);
}
.ProjectCard footer {
}
.ProjectCard footer p {
  margin-right: 0.6em;
  text-transform: uppercase;
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
  font-family: var(--font-mono);
}
.ProjectCard :deep(.EventDatetime) {
  color: var(--fg);
}
</style>
