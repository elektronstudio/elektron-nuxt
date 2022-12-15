<script setup lang="ts">
definePageMeta({
  title: "About us",
});
breadcrumbs.value = [];
const { data, error } = await useAboutPage();
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <main class="Page About" v-else>
    <ContentBlocks
      :key="lang"
      :cards="lang === 0 ? data.cards : data.localizations[0].cards"
    />
  </main>
</template>
