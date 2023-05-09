<script setup lang="ts">
import { Event } from "~~/types";

type Props = {
  event: Event;
  layout?: "vertical" | "horizontal";
  noButtons: boolean;
};

const {
  event,
  layout = "horizontal",
  noButtons = false,
} = defineProps<Props>();
</script>

<template>
  <article class="EventCard" :class="layout">
    <figure>
      <EImage v-if="event.thumbnail" :media="event.thumbnail" />
      <img v-else src="/images/bg-texture-xs.gif" />
    </figure>
    <div class="content">
      <header>
        <div class="topBar">
          <EventDatetime :event="event" />
          <div
            class="locations"
            v-if="
              event.online || event.streamUrl || event.live || event.onlocation
            "
          >
            <span v-if="event.online || event.streamUrl">
              <Icon name="radix-icons:globe" />Online
            </span>

            <span v-if="event.onlocation">
              <Icon name="radix-icons:sewing-pin" />Onsite
            </span>
          </div>
        </div>
        <NuxtLink :to="event.eventLink">
          <ETitle el="h4" size="xs" class="eventTitle">
            {{ event.title }}
          </ETitle>
        </NuxtLink>
      </header>
      <section v-if="!noButtons">
        <EventButtons :event="event" />
      </section>
    </div>
  </article>
</template>

<style scoped>
.EventCard {
  display: flex;
  padding: var(--p-3) 0;
  border-top: 1px solid var(--gray-500);
}
.EventCard figure {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border-radius: var(--rounded-md);
  background-color: var(--gray-500);
  overflow: hidden;
}
.EventCard figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.EventCard .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.EventCard header {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.EventCard,
.EventCard.vertical .content {
  gap: var(--gap-3);
}
.EventCard.vertical:first-child {
  border-top: none;
}
.EventCard.vertical section > *:first-child {
  order: 2;
}
.EventCard section {
  display: flex;
  gap: var(--gap-3);
  flex-shrink: 0;
}
.EventCard time {
  color: var(--gray-300);
}
.eventTitle {
  color: var(--fg);
}

.topBar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.locations {
  display: flex;
  gap: var(--gap-2);
  color: var(--gray-300);
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.locations span {
  display: flex;
  align-items: center;
  gap: 0.2em;
}
/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EventCard section {
    margin-top: var(--m-3);
  }
}

@media only screen and (min-width: 600px) {
  .topBar {
    align-items: center;
    flex-grow: 1;
    width: 100%;
  }
  .EventCard section {
    flex-direction: row;
    align-items: flex-start;
  }
}
</style>
