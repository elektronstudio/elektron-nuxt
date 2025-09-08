<!-- TODO: Should this be added to components page -->
<script setup lang="ts">
import type { MediaItem, Project } from "~~/types";

type Props = {
  name?: string;
  media?: MediaItem;
  content?: string;
  projectPath?: string;
};

const { name, media, content, projectPath } = defineProps<Props>();
const { locale } = useI18n();
</script>

<template>
  <NuxtLinkLocale
    class="ArtistCard"
    :to="
      projectPath
        ? `/${locale === 'et' ? 'projektid' : 'projects'}/${projectPath}`
        : ''
    "
  >
    <ECard :media="media">
      <template #header>
        <ETitle v-if="name" el="h3" size="lg">
          {{ name }}
        </ETitle>
      </template>
      <template #footer>
        <EContent :content="content" />
      </template>
    </ECard>
  </NuxtLinkLocale>
</template>

<style scoped>
@media only screen and (min-width: 1240px) {
  .ArtistCard {
    grid-column: span 3;
  }
}
</style>
