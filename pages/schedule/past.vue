<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  title: "pages.past_events",
});

breadcrumbs.value = [
  {
    title: t("schedule"),
    link: "schedule",
  },
  {
    title: t("past"),
  },
];

const { data: pastEvents, error } = await useEvents({
  sort: ["start_at:desc"],
  filters: { start_at: { $lt: today() } },
});
</script>

<template>
  <ErrorCard v-if="error" />
  <ScheduleWrapper v-else key="past">
    <aside>
      <ETitle size="lg" style="margin-bottom: var(--m-3)">
        {{ $t("pages.past_events") }}
      </ETitle>
      <NuxtLinkLocale to="/schedule" class="EButton xs anime">
        {{ $t("upcoming_events") }}
      </NuxtLinkLocale>
    </aside>
    <section>
      <ScheduleItem
        v-if="pastEvents?.length > 0"
        v-for="event in pastEvents"
        :event="event"
      />
    </section>
  </ScheduleWrapper>
</template>
