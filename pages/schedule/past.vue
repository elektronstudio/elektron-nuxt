<script setup lang="ts">
definePageMeta({
  title: "Some Page",
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
      <NuxtLink to="/schedule">
        <EButton size="xs" el="a" color="transparent">
          <Icon name="radix-icons:arrow-left" />
          {{ ["Upcoming events", "Tulevased sündmused"][lang] }}
        </EButton>
      </NuxtLink>
      <ETitle>
        {{ ["Past events", "Toimunud sündmused"][lang] }}
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
