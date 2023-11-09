<script setup lang="ts">
import type { MediaItem } from "~~/types";

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
    <template
      v-if="
        nextEvent &&
        (nextEvent.urgency === 'soon' || nextEvent.urgency === 'live')
      "
      #footer
    >
      <p class="next-event">Järgmine etendus:</p>
      <EventDatetime :event="nextEvent" />
    </template>
    <template v-else-if="nextEvent && nextEvent.urgency === 'now'" #footer>
      <EButton color="accent" size="xs">Live now!</EButton>
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
