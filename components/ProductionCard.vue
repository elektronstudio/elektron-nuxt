<!-- @TODO: Should this be added to components page -->
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
  <ECard :media="media">
    <template #header>
      <ETitle el="h3" size="lg">
        {{ title }}
      </ETitle>
      <h6 v-if="author" v-html="author" />
    </template>
    <template #footer>
      <p v-if="nextEvent">Järgmine etendus:</p>
      <time v-if="nextEvent" :datetime="nextEvent">
        {{ nextEvent }}
      </time>
    </template>
  </ECard>
</template>
<style scoped>
.ECard footer,
.ECard header h6 {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}
.ECard header h3 {
  margin-bottom: var(--m-2);
}
.ECard footer {
  justify-content: space-between;
}
.ECard footer p {
  margin-right: 0.6em;
}
</style>
