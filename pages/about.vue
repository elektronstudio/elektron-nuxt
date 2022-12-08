<script setup lang="ts">
definePageMeta({
  title: "About us",
});

const { data, error } = await useAboutPage();
const { lang } = useLang();
const cards = ref(
  lang.value === 0 ? data.value.cards : data.value.localizations[1].cards,
);
</script>

<template>
  <ErrorCard v-if="error" />
  <main class="Page About" v-else>
    <ContentBlocks :cards="cards" />
  </main>
</template>
