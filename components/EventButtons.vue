<script setup lang="ts">
import { Event } from "~~/types";

// @TODO: Type this
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
</script>

<template>
  <NuxtLink
    v-if="event.status === 'FREE' || event.status === 'HAS_TICKET'"
    :to="event.eventLiveLink"
  >
    <EButton v-if="urgency === 'now'" el="a" :size="size" color="accent">
      {{ ["Live now!", "Vaata laivis!"][lang] }}
    </EButton>
    <EButton v-else-if="urgency === 'future'" el="a" :size="size" color="gray">
      {{
        `${
          ["Event starts in: ", "Üritus algab: "][lang]
        } ${formattedStartAtDistance}`
      }}
    </EButton>
    <EButton v-else-if="urgency === 'past'" el="a" :size="size" color="gray">
      {{ ["Revisit event", "Meenuta üritust"][lang] }}
    </EButton>
  </NuxtLink>
  <!-- <p v-if="event.status === 'HAS_TICKET'">
    {{ ["You have a ticket", "Sul on ürituse pilet"][lang] }}
  </p> -->
  <EButton
    v-else-if="event.status === 'REQUIRES_TICKET'"
    v-for="ticketLink in event.ticketLinks"
    :href="ticketLink"
    target="_blank"
    el="a"
    :size="size"
    color="accent"
  >
    <Icon name="radix-icons:arrow-right" />
    {{ ["Get a ticket", "Osta pilet"][lang] }}
  </EButton>
</template>
