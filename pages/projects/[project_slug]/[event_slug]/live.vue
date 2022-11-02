<script setup lang="ts">
import EDraggable from "~~/components/e/Draggable.client.vue";
import EDraggableMobile from "~~/components/e/DraggableMobile.client.vue";

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

      <component
        :is="mobile ? EDraggableMobile : EDraggable"
        v-bind="draggables.video"
      >
        <Videostream url="xxx" />
      </component>
      <component
        :is="mobile ? EDraggableMobile : EDraggable"
        v-bind="draggables.chat"
      >
        <Chat :channel="slug" />
      </component>
      <component
        :is="mobile ? EDraggableMobile : EDraggable"
        v-bind="draggables.about"
      >
        <EStack style="padding: var(--p-5)">
          <ETitle size="lg">Live event: {{ event.title }}</ETitle>
          <EContent :content="event.intro" />
        </EStack>
      </component>
      <component
        :is="mobile ? EDraggableMobile : EDraggable"
        v-if="event.controls"
        v-bind="draggables.controls"
      >
        <Controls :controls="controls" />
      </component>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </template>
</template>
