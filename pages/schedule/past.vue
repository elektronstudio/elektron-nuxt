<script setup lang="ts">
definePageMeta({
  title: "Past events",
});

const { lang } = useLang();

breadcrumbs.value = [
  {
    title: "Schedule",
    link: "/schedule",
  },
  {
    title: "Past",
  },
];

const { data: upcomingEvents, error } = await useEvents({
  sort: ["start_at:desc"],
  filters: { start_at: { $lt: today() } },
});
</script>

<template>
  <ErrorCard v-if="error" />
  <ScheduleWrapper v-else key="past">
    <aside>
      <ETitle size="lg" style="margin-bottom: var(--m-3)">
        {{ ["Past events", "Toimunud sündmused"][lang] }}
      </ETitle>
      <NuxtLink to="/schedule/past" class="EButton xs anime">
        {{ ["Upcoming events", "Tulevased sündmused"][lang] }}
      </NuxtLink>
    </aside>
    <section>
      <ScheduleItem
        v-if="upcomingEvents?.length > 0"
        v-for="event in upcomingEvents"
        :event="event"
      />
    </section>
  </ScheduleWrapper>
</template>
