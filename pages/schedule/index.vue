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
      <NuxtLink to="/schedule/past">
        <EButton size="xs" el="a" color="transparent">
          <Icon name="radix-icons:arrow-left" />
          {{ ["See the past events", "Vaata toimunud sündmusi"][lang] }}
        </EButton>
      </NuxtLink>
      <ETitle>
        {{ ["Upcoming events", "Tulevased sündmused"][lang] }}
      </ETitle>
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
