<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  title: "pages.schedule",
});

breadcrumbs.value = [];

const { data: upcomingEvents, error } = await useEvents({
  filters: { end_at: { $gt: today() } },
});
</script>

<template>
  <ErrorCard v-if="error" />
  <ScheduleWrapper v-else key="future">
    <aside>
      <ETitle size="lg" style="margin-bottom: var(--m-3)">
        {{ $t("upcoming_events") }}
      </ETitle>
      <NuxtLinkLocale to="/schedule/past" class="EButton xs anime">
        {{ $t("see_past_events") }}
      </NuxtLinkLocale>
    </aside>
    <section>
      <ScheduleItem
        v-if="upcomingEvents?.length > 0"
        v-for="event in upcomingEvents"
        :event="event"
      />
      <ETitle
        v-else-if="!upcomingEvents || upcomingEvents?.length === 0"
        size="lg"
      >
        {{ $t("no_upcoming_events") }}
      </ETitle>
    </section>
  </ScheduleWrapper>
</template>
