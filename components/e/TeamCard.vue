<!-- TODO: Should this be added to components page -->
<script setup lang="ts">
import type { MediaItem } from "~~/types";

type Props = {
  name?: string;
  media?: MediaItem;
  content?: string;
};

const { name, media, content } = defineProps<Props>();
</script>

<template>
  <ECard v-if="media" :media="media">
    <template #header>
      <ETitle v-if="name" el="h3" size="lg">
        {{ name }}
      </ETitle>
    </template>
    <template #footer>
      <EContent :content="content" />
    </template>
  </ECard>
  <EBox v-else class="columns1" color="accent" style="aspect-ratio: 1/1">
    <ETitle v-if="name" el="h3" size="lg">
      {{ name }}
    </ETitle>
    <EContent v-if="content" :content="content" />
  </EBox>
</template>
