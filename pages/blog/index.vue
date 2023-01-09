<script setup lang="ts">
const { data: items, error } = await useBlogPosts();
const { lang } = useLang();
useHead({
  title: `Blog – elektron.art`,
});

breadcrumbs.value = [];
</script>

<template>
  <ErrorCard v-if="error" />

  <BlogItems v-else>
    <BlogItem
      v-for="item in items"
      :key="item.id"
      :slug="item.slug"
      :thumbnail="item.thumbnail"
      :title="item.title"
    />
  </BlogItems>
</template>
