<script setup lang="ts">
import type { Event } from "~~/types";

type Props = {
  events: Event[];
};

const { events } = defineProps<Props>();
const { lang } = useLang();
const { locale } = useI18n();
</script>

<template>
  <footer class="AnthroFooter">
    <div class="slotArea">
      <slot />
    </div>

    <div class="eventItems">
      <NuxtLinkLocale
        v-for="event in events"
        :href="`/projects/ruumiantropoloogiad/${event.slug}`"
        class="eventItem EBox accent"
      >
        <header>
          <ETitle v-if="event.titles" class="eventTitle" el="h3" size="lg">
            {{ event.titles[lang] }}
          </ETitle>
          <h4 v-if="event.authors">{{ event.authors }}</h4>
        </header>
        <span> {{ $t("read_more") }}</span>
      </NuxtLinkLocale>
    </div>
  </footer>
</template>

<style scoped>
.AnthroFooter {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
  color: var(--gray-300);
  padding: 0 var(--p-4);
}

.eventItems {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
}

.eventItem {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.slotArea {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slotArea :deep(p) {
  max-width: 50ch;
}

.eventTitle {
  margin-bottom: 0.4em;
}

@media only screen and (min-width: 600px) {
  .eventItems {
    grid-area: items;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--gap-4);
  }
}

@media only screen and (min-width: 1240px) {
  .AnthroFooter {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .AnthroFooter {
    display: grid;
    grid-template-areas: "slot slot slot slot items items items items";
  }
  .slotArea {
    grid-area: slot;
    align-self: start;
  }
}
</style>
