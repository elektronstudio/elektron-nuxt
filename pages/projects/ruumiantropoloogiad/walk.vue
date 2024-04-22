<script setup lang="ts">
const { data: event, error } = await useEventBySlug("walk" as string);
const { data: events } = await useEvents({
  sort: ["start_at:desc"],
  filters: {
    slug: {
      $ne: "walk",
    },
    projects: {
      id: {
        $in: event.value.projects[0].id,
      },
    },
  },
});

// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});
const { t } = useI18n();

breadcrumbs.value = [
  {
    title: t("pages.projects"),
    link: "/projects",
  },
  {
    title: t("anthropologies_of_space"),
    link: `/projects/ruumiantropoloogiad`,
  },
  {
    title: event.value.title,
    link: `/projects/ruumiantropoloogiad/${event.value.slug}`,
  },
];
</script>

<template>
  <ErrorCard v-if="error" />
  <AnthroPage v-else :event="event" :events="events" />
</template>
