<script setup lang="ts">
import type { MediaItem } from "~~/types";

const { lang } = useLang();

type Props = {
  event: any;
};

const { event } = defineProps<Props>();
</script>
<template>
  <PinnedItem>
    <aside>
      <EStack is="header">
        <EventDatetime :event="event" />
        <NuxtLinkLocale :to="event.eventLink">
          <ETitle el="h3">
            {{ event.titles[0] }}
          </ETitle>
        </NuxtLinkLocale>
        <EContent :content="event.intros[lang]" />
      </EStack>
      <footer>
        <div class="eventButtons">
          <EventButtons :event="event" />
        </div>
      </footer>
    </aside>
    <EImage v-if="event.thumbnail" :media="(event.thumbnail as MediaItem)" />
  </PinnedItem>
</template>
