<script setup lang="ts">
const slug = "seemsnormal";

const { data: event, error } = await useEventBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});

const wallpaper =
  "https://elektron.fra1.cdn.digitaloceanspaces.com/assets/zahir_seems_normal_wallpaper.jpg";

const baseUrl = "https://elektron.fra1.cdn.digitaloceanspaces.com/assets/";

const tracks = [
  "ZAHIR_1__Post_Boner.mp3",
  "ZAHIR_2__Bad Tattoo_Depression_Blues.mp3",
  "ZAHIR_3__Roxanne.mp3",
  "ZAHIR_4__Kodak_Moment.mp3",
  "ZAHIR_5__Uniform.mp3",
  "ZAHIR_6__Return_Of_The_Hypochondriac_Man.mp3",
  "ZAHIR_7__The_Making_Of_Psycho.mp3",
  "ZAHIR_8__F.mp3",
  "ZAHIR_9__First_Snow.mp3",
].map((filename) => {
  const name = filename.split("__")[1].split(".")[0].replace(/_/g, " ");
  return { name, url: baseUrl + filename };
});

const draggables = useDraggables({
  side1: {
    initialX: 1,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 6,
  },
  side2: {
    initialX: 6,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 6,
  },
  chat: {
    contentType: "chat",
    initialX: 16,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
  },
});

const { theme } = useTheme();
</script>
<template>
  <ErrorCard v-if="error" />
  <EBreadBoard v-else :wallpaper="wallpaper">
    <BackToEvent :event="event" />

    <DraggableHoc v-bind="draggables.side1">
      <div v-for="(track, i) in tracks.slice(0, 4)" class="mt-4">
        <Title small>{{ i + 1 }}. {{ track.name }}</Title>
        <audio
          :src="track.url"
          controls
          :class="['invert', ''][theme]"
          class="w-full"
          controlsList="nodownload"
        />
      </div>
    </DraggableHoc>
    <DraggableHoc v-bind="draggables.side2">
      <div v-for="(track, i) in tracks.slice(4, 9)" class="mt-4">
        <Title small>{{ i + 1 }}. {{ track.name }}</Title>
        <audio
          :src="track.url"
          controls
          :class="['invert', ''][theme]"
          class="w-full"
          controlsList="nodownload"
        />
      </div>
    </DraggableHoc>
    <DraggableHoc v-bind="draggables.chat">
      <Chat :channel="slug" />
    </DraggableHoc>

    <DraggablesDock :draggables="draggables" />
  </EBreadBoard>
</template>

<style scoped>
audio {
  width: 100%;
}
</style>
