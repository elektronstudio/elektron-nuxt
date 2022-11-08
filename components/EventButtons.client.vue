<script setup lang="ts">
import { Event } from "~~/types";

type Props = {
  event: Event;
  size?: "xs" | "sm" | "md" | "lg";
};

const { event, size = "xs" } = defineProps<Props>();
const { urgency } = useDatetime(event.start_at, event.end_at);
const formattedStartAtDistance = event.start_at
  ? useFormattedDistance(event.start_at)
  : null;
const { lang } = useLang();

const processEventFienta = (event) => {
  // TODO Add [event,event.project] support
  return { ...event, ...getTicketableStatus([event]) };
};
const processEvent = processEventFienta(event);
</script>

<template>
  <NuxtLink
    v-if="
      processEvent.status === 'FREE' || processEvent.status === 'HAS_TICKET'
    "
    :to="processEvent.eventLiveLink"
  >
    <EButton v-if="urgency === 'now'" el="a" :size="size" color="accent">
      {{ ["Live now!", "Vaata laivis!"][lang] }}
    </EButton>
    <EButton
      v-else-if="urgency === 'future' || urgency === 'soon'"
      el="a"
      :size="size"
      color="anime"
    >
      {{
        `${
          ["Event starts: ", "Üritus algab: "][lang]
        } ${formattedStartAtDistance}`
      }}
    </EButton>
    <EButton v-else-if="urgency === 'past'" el="a" :size="size" color="anime">
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
