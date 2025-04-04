<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { format } from "date-fns";
import { parseControls } from "~~/composables/controls";

definePageMeta({
  isLive: true,
});

const route = useRoute();
const slug = route.params.event_slug as string;
const { data: event, error } = await useEventBySlug(slug);
// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});

const draggables = useDraggables({
  stream: {
    initialX: 0,
    initialY: 0,
    tilesWidth: 10,
    maximisable: true,
    hideTitleBarOnIdle: true,
  },
  about: {
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 7,
    initialY: 6,
    docked: true,
  },
  chat: {
    initialX: 16,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
    docked: true,
  },
  data: { initialX: 1, initialY: 2, tilesWidth: 6, tilesHeight: 6 },
  rawdata: { initialX: 8, initialY: 2, tilesWidth: 10, tilesHeight: 6 },
  controls: { initialX: 4, initialY: 5, tilesWidth: 4, tilesHeight: 2 },
});

const controls = parseControls(event.value.controls);
const live = ref<string>(event.value.live);

const { lang } = useLang();

const { messages } = useMessages();
const experimentMessages = computed(() =>
  messages.value.filter((m) =>
    controls?.map((c) => c.channel).includes(m.channel),
  ),
);
const onDownloadCsv = () => {
  downloadCSV(
    experimentMessages.value,
    `${format(new Date(), "dd_MM_y__HH_mm_ss")}.csv`,
  );
};

const { copy } = useClipboard();

const onCopyAndDownloadCsv = () => {
  copy(formatCSV(experimentMessages.value));
  onDownloadCsv();
};

const onClear = () => {
  const clear = confirm("Are you sure you want to clear data?");
  if (clear) {
    messages.value = [];
  }
};

const video = ref<HTMLVideoElement | null>(null);
</script>

<template>
  <div>
    <EBreadBoard>
      <BackToEvent :link="event.eventLink" />
      <DraggableHoc v-bind="draggables.stream" v-if="live">
        <Videostream :url="live" />
        <ECode>{{ formatData(live) }}</ECode>
      </DraggableHoc>

      <DraggableHoc v-bind="draggables.about">
        <EStack style="padding: var(--p-5)">
          <ETitle size="lg">
            {{ event.titles[lang] }}
          </ETitle>
          <EventDatetime :event="event" />
          <EContent :content="event?.descriptions[lang]" />
        </EStack>
      </DraggableHoc>

      <DraggableHoc v-bind="draggables.chat">
        <Chat :channel="slug" />
      </DraggableHoc>

      <DraggableHoc v-if="controls" v-bind="draggables.data">
        <ControlsData :messages="experimentMessages" :controls="controls" />
      </DraggableHoc>

      <DraggableHoc v-bind="draggables.rawdata">
        <div class="rawdata">
          <ECode class="h-full overflow-auto !text-gray-500">
            {{ formatData(experimentMessages, true) }}
          </ECode>
          <EStack
            layout="horizontal"
            style="
              padding: var(--p-3);
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="display: flex; gap: var(--p-4)">
              <EButton color="accent" @click="onCopyAndDownloadCsv" size="xs">
                Copy & download
              </EButton>
              <EButton @click="onDownloadCsv" size="xs"> Download </EButton>
            </div>

            <button class="delete-button" @click="onClear">
              <Icon
                name="ph:trash"
                :class="!experimentMessages.length ? 'text-red-900' : ''"
              />
            </button>
          </EStack>
        </div>
      </DraggableHoc>

      <DraggableHoc v-if="event.controls" v-bind="draggables.controls">
        <Controls :controls="controls" />
      </DraggableHoc>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </div>
</template>

<style scoped>
.rawdata {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.rawdata pre {
  flex: 1;
  overflow: auto;
  text-wrap: nowrap;
}
.delete-button {
  display: flex;
  width: 1rem;
  height: 1rem;
}
.delete-button {
  color: var(--error);
}
</style>
