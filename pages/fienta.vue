<script setup lang="ts">
definePageMeta({
  title: "Fienta",
});
</script>

<template>
  <div class="wrapper">
    <FientaPrompt />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  place-content: center;
  place-items: center;
  height: 100%;
  padding: var(--p-8);
  text-align: center;
}
</style>
