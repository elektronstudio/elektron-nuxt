<script setup lang="ts">
definePageMeta({
  title: "Schedule",
});

const { data: upcomingEvents, error } = await useEvents({
  filters: { end_at: { $gt: today() } },
});
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <ScheduleWrapper v-else key="future">
    <aside>
      <ETitle size="lg" style="margin-bottom: var(--m-3)">
        {{ ["Upcoming events", "Tulevased sündmused"][lang] }}
      </ETitle>
      <NuxtLink to="/schedule/past">
        <EButton size="xs" el="a" color="anime">
          <Icon name="radix-icons:arrow-left" />
          {{ ["See the past events", "Vaata toimunud sündmusi"][lang] }}
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
