<script setup lang="ts">
const route = useRoute();
const slug = route.params.event_slug as string;
const { data: event, error } = await useEventBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});

const videostreams = getVideostreams(event.value.streamkey);

const draggables = useDraggables({
  video: {
    titles: ["Stream", "Stream"],
    contentType: "video",
    initialX: 0,
    initialY: 1,
    tilesWidth: 15,
    maximisable: true,
    hideTitleBarOnIdle: true,
  },
  chat: {
    contentType: "chat",
    initialX: 16,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
  },
  about: {
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 2,
    initialY: 6,
  },
  controls: {
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
  <EBreadBoard>
    <BackToEvent :event="event" />

    <DraggableHoc v-bind="draggables.video" v-if="videostreams.length">
      <Videostream :url="videostreams[0].url" />
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
