<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <NuxtLink v-if="locale === 'et'" :to="switchLocalePath('en')">ENG</NuxtLink>
  <NuxtLink v-else-if="locale === 'en'" :to="switchLocalePath('et')">
    EST
  </NuxtLink>
</template>
