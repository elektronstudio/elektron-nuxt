<script setup lang="ts">
import { Event } from "~~/types";

type Props = {
  event: Event;
};

const { event } = defineProps<Props>();
const { lang } = useLang();
</script>

<template>
  <article class="ScheduleItem">
    <figure>
      <EImage v-if="event.thumbnail" :media="event.thumbnail" />
    </figure>
    <div class="content">
      <header>
        <EventDatetime :event="event" />
        <ETitle v-if="event.authors" size="xs" el="h5" class="project">
          {{ event.authors }}
        </ETitle>
        <!-- <ETitle v-if="event.projects?.[0]" size="xs" el="h5" class="project">
          {{ event.projects[0].titles[lang] }}
        </ETitle> -->
        <NuxtLink :to="event.eventLink">
          <ETitle el="h4" size="xs" class="eventTitle">
            {{ event.title }}
          </ETitle>
        </NuxtLink>
        <!-- <EContent nolinks :content="event.intros[lang]" /> -->

        {{ event.controls }}
      </header>
      <footer>
        <EventButtons :event="event" v-if="event.streamkey" />
      </footer>
    </div>
  </article>
</template>

<style scoped>
.ScheduleItem {
  display: flex;
  padding: var(--p-3) 0;
  border-top: 1px solid var(--gray-500);
  gap: var(--gap-3);
}

.ScheduleItem .EventDatetime,
.ScheduleItem :deep(.EventDatetime) {
  margin-bottom: var(--m-3);
}
.ScheduleItem figure {
  flex-shrink: 0;
  width: 8rem;
  height: 8rem;
  border-radius: var(--rounded-md);
  background-color: var(--gray-500);
  overflow: hidden;
}
.ScheduleItem figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ScheduleItem .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.ScheduleItem header {
  display: flex;
  flex-direction: column;
}

.ScheduleItem header .ETitle > span,
.ScheduleItem .EContent {
  color: var(--gray-300);
}
.ScheduleItem footer {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  flex-shrink: 0;
}
.ScheduleItem time {
  color: var(--gray-300);
}
.eventTitle {
  color: var(--fg);
  margin-bottom: var(--m-3);
}

.project {
  color: var(--gray-300);
}
/* @TODO: Add breakpoints system */

@media only screen and (min-width: 600px) {
  .ScheduleItem .content {
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
