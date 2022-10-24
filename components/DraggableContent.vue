<script setup lang="ts">
export type ContentType =
  | "chat"
  | "text"
  | "image"
  | "video"
  | "event"
  | "controls";

type Props = {
  contentType: ContentType;
  data: any;
};

const { contentType, data } = defineProps<Props>();
</script>
<template>
  <!-- Chat draggable -->
  <Chat v-if="contentType === 'chat'" :channel="data.channel" />

  <!-- Video draggable -->
  <Videostream v-else-if="data && contentType === 'video'" :url="data.url" />

  <!-- Event draggable -->
  <EStack
    v-else-if="data && contentType === 'event'"
    style="padding: var(--p-5)"
  >
    <!-- TODO Reuse existing back button UI -->
    <template v-if="data.event">
      <ETitle size="lg">Live event: {{ data.event.title }}</ETitle>
      <EContent v-html="data.event.intro" />
    </template>
    <!-- TODO What about event.description? -->
  </EStack>

  <Controls v-else-if="data && contentType === 'controls'" :data="data" />
</template>
