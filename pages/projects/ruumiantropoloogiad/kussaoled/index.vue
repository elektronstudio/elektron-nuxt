<script setup lang="ts">
const { data: event, error } = await useEventBySlug("kussaoled" as string);
const { data: events } = await useEvents({
  sort: ["start_at:desc"],
  filters: {
    slug: {
      $ne: "kussaoled",
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
const { lang } = useLang();

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
    title: event.value.titles[lang],
    link: `/projects/ruumiantropoloogiad/${event.value.slug}`,
  },
];
</script>

<template>
  <ErrorCard v-if="error" />
  <AnthroPage v-else :event="event" :events="events">
    <template #header>
      <NuxtLinkLocale
        class="EButton xs accent"
        to="/projects/ruumiantropoloogiad/kussaoled/live"
      >
        {{ $t("live_archive") }}
      </NuxtLinkLocale>
    </template>
  </AnthroPage>
</template>
