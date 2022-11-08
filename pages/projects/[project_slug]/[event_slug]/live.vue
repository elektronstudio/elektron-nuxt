<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const slug = route.params.event_slug as string;
const { data: event, error } = await useEventBySlug(slug as string);

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
    initialX: 1,
    initialY: 6,
  },
  controls: {
    tilesWidth: 4,
    tilesHeight: 2,
    initialX: 10,
    initialY: 6,
  },
});

const controls = parseControls(event.value.controls);
const hasTicket = ref<boolean>(false);
const dialogState = ref<boolean>(true);

onMounted(() => {
  const fientaValidate = getTicketableStatus([event.value]);

  if (fientaValidate.status !== "REQUIRES_TICKET") {
    hasTicket.value = true;
  }
});
</script>

<template>
  <div>
    <BackToEvent :event="event" />
    <EBreadBoard v-if="!hasTicket">
      <EventPreview
        :event="event"
        :dialog-state="dialogState"
        :is-event="true"
        @close-dialog="dialogState = false"
      />
    </EBreadBoard>
    <EBreadBoard v-else>
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
  </div>
</template>

<style scoped>
.ELivePreview {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
