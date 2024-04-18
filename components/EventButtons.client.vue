<script setup lang="ts">
import type { Event } from "~~/types";

type Props = {
  event: Event;
  size?: "xs" | "sm" | "md" | "lg";
};

const { event, size } = withDefaults(defineProps<Props>(), {
  size: "xs",
});
const { urgency } = useDatetime(event.start_at, event.end_at);
const formattedStartAtDistance = event.start_at
  ? useFormattedDistance(event.start_at)
  : null;
const { lang } = useLang();

const processEventFienta = (event: Event) => {
  // TODO Add [event,event.project] support
  return { ...event, ...getTicketableStatus([event]) };
};
const processEvent = processEventFienta(event);
</script>

<template>
  <EButton
    v-if="event.liveExternalUrl"
    :href="event.liveExternalUrl"
    el="a"
    :size="size"
    color="accent"
  >
    <Icon name="radix-icons:external-link" />
    {{ ["Visit event", "Vaata üritust"][lang] }}
  </EButton>
  <NuxtLink
    v-else-if="
      processEvent.status === 'FREE' || processEvent.status === 'HAS_TICKET'
    "
    v-slot="{ href }"
    :to="processEvent.eventLiveLink"
    custom
  >
    <EButton
      v-if="urgency === 'now' && event.haslive"
      el="a"
      :href="href"
      :size="size"
      color="accent"
    >
      {{ $t("live_now") }}
    </EButton>
    <EButton
      v-else-if="urgency === 'future' || urgency === 'soon'"
      el="a"
      :href="href"
      :size="size"
      color="anime"
    >
      {{
        `${
          ["Event starts: ", "Üritus algab: "][lang]
        } ${formattedStartAtDistance}`
      }}
    </EButton>
    <EButton
      v-else-if="urgency === 'past'"
      el="a"
      :href="href"
      :size="size"
      color="anime"
    >
      {{ ["Revisit event", "Meenuta üritust"][lang] }}
    </EButton>
  </NuxtLink>
  <EButton
    v-else-if="processEvent.status === 'REQUIRES_TICKET' && urgency !== 'past'"
    v-for="ticketLink in processEvent.ticketLinks"
    :href="ticketLink"
    target="_blank"
    el="a"
    :size="size"
    color="accent"
  >
    <Icon name="radix-icons:arrow-right" />
    {{ ["Get a ticket", "Osta pilet"][lang] }}
  </EButton>
  <p class="hasTicket" v-if="processEvent.status === 'HAS_TICKET'">
    {{ ["You have a ticket", "Sul on ürituse pilet"][lang] }}
  </p>
</template>

<style scoped>
.hasTicket {
  font-size: var(--text-xs);
  color: var(--gray-300);
  line-height: 1;
}
</style>
