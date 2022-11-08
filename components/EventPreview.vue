<script setup lang="ts">
import { MediaItem } from "~~/types";

const { lang } = useLang();

type Props = {
  event: any;
  isEvent: boolean;
};

const { event, isEvent } = defineProps<Props>();
</script>
<template>
  <div class="ELivePreview">
    <aside>
      <EStack is="header">
        <EventDatetime :event="event" />
        <NuxtLink :to="event.eventLink">
          <ETitle el="h3">
            {{ event.titles[0] }}
          </ETitle>
        </NuxtLink>
        <EContent :content="event.intros[lang]" />
      </EStack>
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
  </div>
</template>

<style scoped>
.ELivePreview {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.ELivePreview aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--p-3);
  color: var(--gray-300);
}
.ELivePreview aside header a {
  color: var(--fg);
}
.ELivePreview aside header p span {
  color: var(--gray-300);
  width: 42%;
  display: inline-block;
}
.ELivePreview aside footer {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: var(--gap-1);
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
  .ELivePreview {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
