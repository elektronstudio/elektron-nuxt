<script setup lang="ts">
import "./styles/vars.css";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import { useCssVar, useIdle, useWindowSize } from "@vueuse/core";
const { idle } = useIdle(3000); // 3 seconds idle

const route: any = useRoute();
const siteName = "elektron.art";

const titleTemplate = (title = undefined) =>
  title ? `${title} / ${siteName}` : siteName;

useHead({
  titleTemplate,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  meta: [{ name: "og:title", content: titleTemplate(route.meta.title) }],
});

const { height } = useWindowSize();
const appHeight = useCssVar("--app-height");
watch(height, (newHeight) => (appHeight.value = `${newHeight}px`), {
  immediate: true,
});
</script>

<template>
  <NuxtLayout :class="{ idle: idle }">
    <Script
      defer
      data-domain="elektron.art"
      src="https://plausible.io/js/plausible.local.js"
    />
    <NuxtPage />
  </NuxtLayout>
</template>
