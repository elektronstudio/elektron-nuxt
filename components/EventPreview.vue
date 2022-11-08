<script setup lang="ts">
import { MediaItem } from "~~/types";

const { lang } = useLang();

type Props = {
  event: any;
  dialogState: boolean;
  isEvent: boolean;
};

const { event, isEvent } = defineProps<Props>();
// @TODO: Consider using more solid comparison for pinned event
const label = computed(() => {
  if (isEvent && event?.value?.urgency === "soon") {
    return ["tulemas", "tulemas"][lang.value];
  } else if (isEvent && event?.value?.urgency === "now") {
    return ["live", "live"][lang.value];
  } else {
    return ["new", "uus"][lang.value];
  }
});
const emit = defineEmits<{
  (e: "close-dialog"): void;
}>();
</script>
<template>
  <EDialog
    v-if="event"
    class="ELivePreview"
    :title="label"
    :dialog-state="dialogState"
    @close-dialog="emit('close-dialog')"
  >
    <aside>
      <header>
        <ETitle v-if="isEvent && event.formattedDistance" el="h6" size="sm">
          {{ event.formattedDistance }}
        </ETitle>
        <ETitle el="h3">
          {{ event.titles[0] }}
        </ETitle>
        <EContent :content="event.intros[lang]" />
      </header>
      <footer>
        <EventButtons v-if="isEvent" :event="event" />
        <template v-else>
          <NuxtLink :to="event.projectLink">
            <EButton size="xs" el="a" color="transparent">
              <Icon name="radix-icons:arrow-right" />
              {{ ["View project", "Vaata projekti"][lang] }}
            </EButton>
          </NuxtLink>
        </template>
      </footer>
    </aside>
    <EImage v-if="event.thumbnail" :media="(event.thumbnail as MediaItem)" />
  </EDialog>
</template>

<style scoped>
.ELivePreview {
  position: relative;
  overflow: hidden;
  background-color: var(--bg);
  width: 100%;
  max-width: 40rem;
}
.ELivePreview :deep(.wrapper) {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.ELivePreview .ETitle {
  margin-bottom: var(--m-3);
}
.ELivePreview aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--p-3);
  color: var(--gray-300);
}
.ELivePreview aside header {
  font-family: font-title-regular, sans-serif;
  font-size: var(--text-3xl);
}
.ELivePreview aside header p span {
  color: var(--gray-300);
  width: 42%;
  display: inline-block;
}
.ELivePreview aside footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-2);
}
.ELivePreview img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}
.closeButton {
  position: absolute;
  right: var(--gap-2);
  top: var(--gap-2);
  z-index: 1;
  color: var(--gray-300);
}
.closeButton:hover {
  opacity: var(--opacity-60);
}

@media only screen and (min-width: 600px) {
  .ELivePreview :deep(.wrapper) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
