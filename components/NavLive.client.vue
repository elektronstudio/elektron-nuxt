<script setup lang="ts">
import { Urgency } from "~~/types";

const {
  data: event,
  formattedStartAtDistance,
  urgency,
  error,
} = await useUpcomingEvent();
const { lang } = useLang();
watch(urgency, (urgency) => {
  if (urgency && urgency.value === ("now" as Urgency)) {
    isLive.value = true;
  }
});
</script>

<template>
  <NuxtLink
    class="NavLive menuItem"
    :to="event.eventLiveLink || event.eventLink"
    :class="{ isLive: urgency?.value === 'now' && event.haslive }"
    v-if="event"
  >
    <a>
      <span v-if="formattedStartAtDistance?.value && urgency?.value !== 'now'">
        {{ formattedStartAtDistance.value }}:
      </span>
      <span v-else-if="urgency?.value === 'now' && !event.haslive">
        {{ ["Happening now", "Praegu käimas"][lang] }}:
      </span>
      <span v-else-if="urgency?.value === 'now'">
        {{ ["Live now", "Live"][lang] }}:
      </span>
      <span class="eventTitle">{{ event.titles[lang] }}</span>
    </a>
  </NuxtLink>
</template>

<style scoped>
.NavLive {
  display: inline;
  overflow: hidden;
  background-color: var(--bg);
  margin-top: calc(var(--border-DEFAULT) * -1);
}
.NavLive a {
  display: flex;
  gap: 0.2em;
}
.NavLive a > span:first-child {
  flex-shrink: 0;
}

.eventTitle {
  color: var(--fg);
}
.NavLive.isLive {
  color: var(--bg);
  background-color: var(--gray-200);
}
.NavLive.isLive:hover {
  background-color: var(--gray-100);
}
.NavLive.isLive .eventTitle {
  color: var(--bg);
}
@media only screen and (max-width: 599px) {
  .NavLive {
    border-top: none;
    width: 100%;
    order: 99;
  }
}
@media only screen and (min-width: 600px) {
  .NavLive {
    width: 20rem;
    padding: var(--p-1);
    margin-top: 0;
  }
}
@media only screen and (min-width: 1000px) {
  .NavLive {
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
}
@media only screen and (min-width: 1240px) {
  .NavLive {
    width: 26rem;
  }
}
/* TODO: how to inherit this from Nav */
.menuItem {
  display: inline-flex;
  height: var(--h-9);
  padding: var(--p-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  color: var(--gray-300);
  border: var(--border-DEFAULT) solid var(--gray-500);
}
</style>
