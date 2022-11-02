<script setup lang="ts">
const route = useRoute();
const slug = route.params.event_slug as string;
const { data: event, error } = await useEventBySlug(slug as string);
const videostreams = getVideostreams(event.value.streamkey);

// TODO: support multiple videos
const stream = computed(() => {
  return videostreams?.[0];
});

const draggables = useDraggables({
  video: {
    titles: ["Stream", "Striim"],
    draggableId: "videosteam",
    contentType: "video",
    initialX: 0,
    initialY: 1,
    tilesWidth: 15,
    maximisable: true,
    hideTitleBarOnIdle: true,
  },
  chat: {
    titles: ["Chat", "Chät"],
    draggableId: "chat",
    contentType: "chat",
    initialX: 16,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
  },
  about: {
    titles: ["About", "Info"],
    draggableId: "about",
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 2,
    initialY: 6,
  },
  controls: {
    titles: ["Controls", "Controls"],
    draggableId: "controls",
    tilesWidth: 4,
    tilesHeight: 2,
    initialX: 11,
    initialY: 8,
  },
});

const controls = parseControls(event.value.controls);

const mobile = breakpoints.smaller("large");
</script>

<template>
  <ErrorCard v-if="error" />
  <template v-else>
    <EBreadBoard>
      <BackToEvent :event="event" />

      <DraggableHoc v-bind="draggables.video">
        <Videostream url="xxx" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.chat">
        <Chat :channel="slug" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.about">
        <EStack style="padding: var(--p-5)">
          <ETitle size="lg">Live event: {{ event.title }}</ETitle>
          <EContent :content="event.intro" />
        </EStack>
      </DraggableHoc>
      <DraggableHoc v-if="event.controls" v-bind="draggables.controls">
        <Controls :controls="controls" />
      </DraggableHoc>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </template>
</template>
