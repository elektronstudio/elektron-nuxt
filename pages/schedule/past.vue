<script setup lang="ts">
definePageMeta({
  title: "Past events",
});

const { data: upcomingEvents, error } = await useEvents({
  sort: ["start_at:desc"],
  filters: { start_at: { $lt: today() } },
});

const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <ScheduleWrapper v-else key="past">
    <aside>
      <ETitle size="lg" style="margin-bottom: var(--m-3)">
        {{ ["Past events", "Toimunud sündmused"][lang] }}
      </ETitle>
      <NuxtLink to="/schedule">
        <EButton size="xs" el="a" color="anime">
          <Icon name="radix-icons:arrow-left" />
          {{ ["Upcoming events", "Tulevased sündmused"][lang] }}
        </EButton>
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
