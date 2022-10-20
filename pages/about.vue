<script setup lang="ts">
const { data, error } = await useAboutPage();
</script>

<template>
  <main class="Page About" v-if="data.cards">
    <ContentBlocks :cards="data.cards" />
  </main>
</template>
