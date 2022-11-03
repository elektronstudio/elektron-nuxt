<script setup lang="ts">
import "./styles/vars.css";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import { useCssVar, useIdle, useWindowSize } from "@vueuse/core";
const { idle } = useIdle(3000); // 3 seconds idle

const { height } = useWindowSize();
const appHeight = useCssVar("--app-height");
watch(height, (newHeight) => (appHeight.value = `${newHeight}px`), {
  immediate: true,
});
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
  <UserInfo />
  <EWindowBorder />
  <DraggableChat />
</template>
