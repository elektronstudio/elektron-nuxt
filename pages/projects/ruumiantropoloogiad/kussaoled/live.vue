<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { differenceInHours } from "date-fns";

definePageMeta({
  title: "Where are you",
  labTitle: "Where are you",
  labIntro: "Interactive hybrid installation in Baltoscandal 2022",
  labGroup: "Experiments",
});
breadcrumbs.value = [];
const REFRESH_INTERVAL = 1000 * 10;
const path = "anthropologies2";

const slug = "kussaoled";
const { data: event, error } = await useEventBySlug(slug);

const { theme, changeTheme } = useTheme();

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
  capture: { tilesWidth: 10, tilesHeight: 6, initialX: 10, initialY: 4 },
  about: {
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 2,
    initialY: 6,
  },
});

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const live = ref<string>(event.value.live);

const { width, height } = useVideostreamLegacy(video, live);
const { capture: captureFrame, frame } = useVideoframe(
  video,
  canvas,
  width,
  height,
);

const { getFiles, uploadFile } = useFiles();
const { data: files, refresh: refreshCaptures } = await getFiles(path);

const capture = async () => {
  captureFrame();
  await uploadFile(path, randomFilename("jpg"), frame.value.src);
  await refreshCaptures();
};

const remaining = ref();

const { data: historicChatMessages, refresh: refreshChat } =
  await useChatHistory(slug);

const messages = computed(
  () =>
    historicChatMessages.value.map((m, i) => {
      const hours = differenceInHours(
        new Date(event.value.start_at),
        new Date(m.datetime),
      );
      return {
        value: m.value,
        x: stringToCoords(m.value, 100, 100)[0],
        y: stringToCoords(m.value, 100, 100)[1],
        hours,
      };
    }),
  //.filter((m) => m.hours > 1)
);

useIntervalFn(() => {
  refreshCaptures();
  refreshChat();
}, REFRESH_INTERVAL);
const { lang, changeLang } = useLang();

const wallpapers = [
  "https://elektron.fra1.cdn.digitaloceanspaces.com/assets/wallpaper.jpg",
];

onMounted(() => {
  changeLang();
  changeTheme();
});
</script>

<template>
  <div>
    <EBreadBoard :wallpaper="wallpapers[0]">
      <BackToEvent :link="event.eventLink" />
      <video
        ref="video"
        muted
        autoplay
        playsinline
        crossorigin="anonymous"
        class="pointer-events-none fixed top-0 left-0 z-[1000] h-0 w-0 touch-none"
      />
      <canvas ref="canvas" class="border-3 hidden opacity-0" />

      <ChatOverlay
        :messages="messages.filter((h) => h.hours < 24)"
        :channel="slug"
      />

      <div
        class="z-10 flex items-center justify-between md:absolute md:top-6 md:left-6 md:right-6"
      >
        <Button small left :to="event?.eventLink">
          {{ ["Event info", "Ürituse info"][lang] }}
        </Button>
        <div class="flex items-center space-x-4">
          <Button
            small
            @click="changeLang"
            class="cursor-pointer !text-gray-300"
          >
            {{ ["Eesti keeles", "In english"][lang] }}
          </Button>
          <Icon
            name="radix-iconsh.alf-2"
            @click="changeTheme"
            class="cursor-pointer text-gray-300 transition-colors hover:text-gray-500"
          />
        </div>
      </div>

      <DraggableHoc v-bind="draggables.video" v-if="live">
        <div class="md:w-[70vw]">
          <Videostream :url="live">
            <RechargingButton @click="capture">
              <Icon name="radix-icons:camera" />
              {{ ["Capture", "Pildista"][lang] }}
            </RechargingButton>
          </Videostream>
        </div>
      </DraggableHoc>

      <DraggableHoc v-bind="draggables.capture">
        <EStack style="width: 100%; padding: var(--p-4)">
          <EStack style="align-items: flex-start; gap: var(--gap-4)">
            <RechargingButton
              @remaining="(r) => (remaining = r)"
              @click="capture"
              class="shrink-0"
            >
              <Icon name="radix-icons:camera" />
              {{ ["Capture", "Pildista"][lang] }}
            </RechargingButton>
            <div class="font-sm text-gray-500">
              {{
                [
                  "When you use all your captures, you can capture again in",
                  "Kui sul film otsa saab, pead ootama",
                ][lang]
              }}
              {{ remaining }}s
            </div>
          </EStack>

          <div
            style="
              display: grid;
              width: 100%;
              grid-template-columns: 1fr 1fr 1fr;
              overflow-y: auto;
              gap: var(--gap-3);
            "
          >
            <div v-if="!files?.length" style="aspect-ratio: 16 / 9" />
            <img
              v-for="file in files"
              :key="file.filename"
              :src="file.src"
              class="pointer-events-none aspect-video transform"
            />
          </div>
        </EStack>
      </DraggableHoc>

      <DraggableHoc v-bind="draggables.about">
        <EStack style="padding: var(--p-5); gap: var(--gap-4)">
          <ETitle v-if="event.authors" size="sm">
            {{ event.authors }}
          </ETitle>
          <ETitle size="md" class="transition">
            {{ event.titles[lang] }}
          </ETitle>
          <EventDatetime :event="event" />
          <EContent :content="event.intros[lang]" />
          <EContent :content="event?.descriptions[lang]" />
          <EDetailsList :details="parseDetails(event.detailss[lang])" />
        </EStack>
      </DraggableHoc>

      <div class="block h-8 md:hidden" />
      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </div>
</template>
