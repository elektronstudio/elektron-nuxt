<script setup lang="ts">
import { Urgency } from "~~/types";

const route = useRoute();
const slug = route.params.event_slug as string;
const { lang } = useLang();
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
    // tilesHeight: 2,
    initialX: 10,
    initialY: 6,
  },
});

const controls = parseControls(event.value.controls);
const hasTicket = ref<boolean>(false);
const dialogState = ref<boolean>(true);

// @TODO: Move this to processing level
const { urgency } = useDatetime(event.value.start_at, event.value.end_at);
const urgencyLabel = computed(() => {
  if (urgency.value === ("future" as Urgency)) {
    return ["upcoming", "tulemas"];
  } else if (urgency.value === ("soon" as Urgency)) {
    return ["soon", "varsti"];
  } else if (urgency.value === ("now" as Urgency)) {
    return ["live", "live"];
  } else {
    return ["new", "uus"];
  }
});

const noTicketDraggables = useDraggables({
  preview: {
    titles: urgencyLabel.value,
    initialX: 6,
    initialY: 2,
    tilesWidth: 8,
    // tilesHeight: 5,
  },
});

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
    <EBreadBoard v-if="!hasTicket" :wallpaper="event.wallpaper?.url">
      <DraggableHoc v-bind="noTicketDraggables.preview">
        <EventPreview
          :event="event"
          :dialog-state="dialogState"
          :is-event="true"
          @close-dialog="dialogState = false"
        />
      </DraggableHoc>
      <DraggablesDock :draggables="noTicketDraggables" />
    </EBreadBoard>
    <EBreadBoard v-else :wallpaper="event.wallpaper?.url">
      <DraggableHoc v-bind="draggables.video" v-if="event.streamUrl">
        <Videostream :url="event.streamUrl" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.video" v-else-if="videostreams?.length">
        <Videostream :url="videostreams[0].url" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.chat">
        <Chat :channel="slug" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.about">
        <EStack style="padding: var(--p-5)">
          <ETitle size="lg">Live event: {{ event.title }}</ETitle>
          <EContent :content="event.live_contents[lang]" />
        </EStack>
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.controls">
        <MementoButtons :initial-controls="event.controls" />
      </DraggableHoc>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </div>
</template>
