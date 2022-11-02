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
    x: 0,
    y: 1,
    tilesWidth: 15,
    maximisable: true,
    hideTitleBarOnIdle: true,
  },
  chat: {
    titles: ["Chat", "Chät"],
    draggableId: "chat",
    contentType: "chat",
    x: 16,
    y: 1,
    tilesWidth: 4,
    tilesHeight: 8,
  },
  about: {
    titles: ["About", "Info"],
    draggableId: "about",
    contentType: "event",
    tilesWidth: 8,
    tilesHeight: 4,
    x: 2,
    y: 7,
  },
});

const mobile = breakpoints.smaller("large");
</script>

<template>
  <ErrorCard v-if="error" />
  <template v-else>
    <BackToEvent :event="event" />
    <EBreadBoard>
      <!-- <template v-if="mobile && false">
        <template
          v-for="draggable in draggablesState"
          :key="draggable.draggableId"
        >
          <EDraggableMobile
            :draggable="draggable"
            @update-draggables="updateDraggablesMobile"
          >
            <DraggableContent
              v-if="draggable.contentType"
              :content-type="draggable.contentType"
              :data="draggable.data"
            />
          </EDraggableMobile>
        </template>
      </template> -->
      <!-- <template> -->
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
      <!-- </template> -->

      <!-- <DraggablesDock
        v-if="mobile"
        :draggables="draggablesState"
        :mobile="mobile"
        @update-draggables="updateDraggablesMobile"
      /> -->
      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </template>
</template>
