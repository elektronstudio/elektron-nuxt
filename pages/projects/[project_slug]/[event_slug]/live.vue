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
    contentType: "event",
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 2,
    initialY: 7,
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
      <template v-if="mobile">
        <EDraggableMobile v-bind="draggables.video">
          <Videostream url="xxx" />
        </EDraggableMobile>
        <EDraggableMobile v-bind="draggables.chat">
          <Chat :channel="slug" />
        </EDraggableMobile>
        <EDraggableMobile v-bind="draggables.about">
          <EStack style="padding: var(--p-5)">
            <ETitle size="lg">Live event: {{ event.title }}</ETitle>
            <EContent :content="event.intro" />
          </EStack>
        </EDraggableMobile>
      </template>
      <template v-else>
        <EDraggable v-bind="draggables.video">
          <Videostream url="xxx" />
        </EDraggable>
        <EDraggable v-bind="draggables.chat">
          <Chat :channel="slug" />
        </EDraggable>
        <EDraggable v-bind="draggables.about">
          <EStack style="padding: var(--p-5)">
            <ETitle size="lg">Live event: {{ event.title }}</ETitle>
            <EContent :content="event.intro" />
          </EStack>
        </EDraggable>
      </template>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </template>
</template>
