<script setup lang="ts">
const { data: event, error } = await useEventBySlug("layers" as string);
const { data: events } = await useEvents({
  sort: ["start_at:desc"],
  filters: {
    slug: {
      $ne: "layers",
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
const { lang } = useLang();

breadcrumbs.value = [
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: ["Anthropologies of space", "Ruumiantropoloogiad"][lang.value],
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
  <AnthroPage v-else :event="event" :events="events">
    <template #header>
      <EButton
        el="a"
        href="https://www.post-gallery.online/elektron/index.html"
        target="_blank"
        size="xs"
        color="accent"
      >
        {{ ["Play", "Play"][lang] }}
      </EButton>
    </template>
  </AnthroPage>
</template>
