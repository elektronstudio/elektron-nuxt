<script setup lang="ts">
import { Event } from "~~/types";

// @TODO: Type this
type Props = {
  event: Event;
};

const { event } = defineProps<Props>();
const { urgency } = useDatetime(event.start_at, event.end_at);
const { lang } = useLang();
</script>

<template>
  <NuxtLink
    v-if="event.status === 'FREE' || event.status === 'HAS_TICKET'"
    :to="event.eventLiveLink"
  >
    <EButton el="a" size="xs" :color="urgency === 'past' ? 'gray' : 'accent'">
      {{
        urgency === "past"
          ? ["Revisit event", "Meenuta üritust"][lang]
          : ["Watch event", "Vaata üritust"][lang]
      }}
    </EButton>
  </NuxtLink>
  <p v-if="event.status === 'HAS_TICKET'">
    {{ ["You have a ticket", "Sul on ürituse pilet"][lang] }}
  </p>

  <EButton
    v-if="event.status === 'REQUIRES_TICKET'"
    v-for="ticketLink in event.ticketLinks"
    :href="ticketLink"
    target="_blank"
    el="a"
    size="xs"
    color="accent"
    >{{ ["Get a ticket", "Osta pilet"][lang] }}
  </EButton>
</template>
