<script setup lang="ts">
definePageMeta({
  title: "pages.artists",
});
breadcrumbs.value = [];
const { data, error } = await useArtistsPage();
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <main class="Page About" v-else>
    <div class="ContentBlocks">
      <EArtistCard
        v-for="item in data.artists"
        :key="item.id"
        :media="item?.image"
        :name="item.name"
        :project-path="item.projectPath"
      />
    </div>
  </main>
</template>

<style scoped>
.Page {
  padding: var(--p-4);
}
.ContentBlocks {
  display: flex;
  flex-direction: column;
  gap: var(--gap-5);
  padding: 0 var(--p-4);
  margin-bottom: var(--m-12);
}
/* TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .ContentBlocks {
    display: grid;
    grid-gap: var(--gap-5);
    grid-template-columns: repeat(2, 1fr);
  }
}
/* TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .ContentBlocks {
    grid-template-columns: repeat(12, 1fr);
  }
  .ContentBlocks .ECard {
    grid-column: span 3;
  }
}
</style>
