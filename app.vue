<script setup lang="ts">
import "./styles/vars.css";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import { useIdle } from "@vueuse/core";
const { idle } = useIdle(3000); // 3 seconds idle
</script>

<template>
  <NuxtLayout :class="{ idle: idle }">
    <!-- <Script
      defer
      data-domain="elektron.art"
      src="https://plausible.io/js/plausible.local.js"
    /> -->
    <NuxtPage />
  </NuxtLayout>
</template>
