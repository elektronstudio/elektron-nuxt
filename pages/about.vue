<script setup lang="ts">
definePageMeta({
  title: "About us",
});

const { data, error } = await useAboutPage();
console.log(data.value);
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <main class="Page About" v-else>
    <ContentBlocks
      :cards="lang === 0 ? data.cards : data.localizations[0].cards"
    />
  </main>
</template>
