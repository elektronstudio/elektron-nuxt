<script setup lang="ts">
const { data, error } = await useAboutPage();
</script>

<template>
  <ErrorCard v-if="error" />
  <main class="Page About" v-else>
    <ContentBlocks :cards="data.cards" />
  </main>
</template>
