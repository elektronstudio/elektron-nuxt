<script setup lang="ts">
const { data: items, error } = await useBlogPosts();

useHead({
  title: `Blog – elektron.art`,
});
</script>

<template>
  <ErrorCard v-if="error" />

  <div v-else class="blogItems">
    <NuxtLink
      v-for="item in items"
      :href="`/blog/${item.slug}`"
      class="blogItem EBox"
    >
      <ETitle v-if="item.title" el="h3" size="lg">
        {{ item.title }}
      </ETitle>
      <EButton color="accent" size="xs">Read more</EButton>
    </NuxtLink>
  </div>
</template>

<style scoped>
.blogItems {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
  padding: var(--p-4);
}
.blogItem {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

@media only screen and (min-width: 600px) {
  .blogItems {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--gap-4);
  }
}

@media only screen and (min-width: 1240px) {
  .blogItems {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
