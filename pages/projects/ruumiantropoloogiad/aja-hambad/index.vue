<script setup lang="ts">
const { data: event, error } = await useEventBySlug("aja-hambad" as string);
const { data: events } = await useEvents({
  sort: ["start_at:desc"],
  filters: {
    slug: {
      $ne: "aja-hambad",
    },
    projects: {
      id: {
        $in: event.value.projects[0].id,
      },
    },
  },
});
const { data: blogs } = await useBlogPosts();
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
    <BlogItems v-if="blogs">
      <BlogItem
        v-for="item in blogs"
        :key="item.id"
        :thumbnail="item.thumbnail"
        :titles="item.titles"
        :slug="`/projects/ruumiantropoloogiad/aja-hambad/${item.slug}`"
      />
    </BlogItems>
  </AnthroPage>
</template>
