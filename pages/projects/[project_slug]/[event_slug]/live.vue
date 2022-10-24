<script setup lang="ts">
import { Draggable } from "~~/types/draggables";

const route = useRoute();
const slug = route.params.event_slug;
const { data: event, error } = await useEventBySlug(slug as string);
const videostreams = getVideostreams(event.value.streamkey);

// TODO: support multiple videos
const stream = computed(() => {
  return videostreams?.[0];
});

const data = computed(() => {
  if (!event) {
    return null;
  }
  const d = [
    {
      title: "Stream",
      draggableId: "videosteam",
      contentType: "video",
      gridPosX: 0,
      gridPosY: 1,
      tilesWidth: 15,
      isMinimised: false,
      isMaximised: false,
      isMaximisable: true,
      hideTitleBarOnIdle: true,
      order: 0,
      data: {
        url: stream?.value?.url,
      },
    },
    {
      title: "Chat",
      draggableId: "chat",
      contentType: "chat",
      gridPosX: 16,
      gridPosY: 1,
      tilesWidth: 4,
      tilesHeight: 8,
      order: 1,
      data: {
        channel: slug,
      },
    },
    {
      title: "About",
      draggableId: "about",
      contentType: "event",
      tilesWidth: 8,
      tilesHeight: 4,
      gridPosX: 2,
      gridPosY: 7,
      order: 2,
      data: {
        event: event,
      },
    },
  ];
  // if (event.controls) {
  //   d.push({
  //     title: "Controls",
  //     draggableId: "controls",
  //     contentType: "controls",
  //     tilesWidth: 9,
  //     tilesHeight: 3,
  //     gridPosX: 9,
  //     gridPosY: 3,
  //     order: 3,
  //     data: {
  //       event: event,
  //     },
  //   });
  // }
  return d as Draggable[];
});
</script>

<template>
  <LiveView v-if="data" :data="data" :event="event" />
</template>
