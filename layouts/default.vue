<script setup lang="ts">
import "@/styles/vars.css";
import "@/styles/reset.css";
import "@/styles/fonts.css";
import "@/styles/styles.css";
import { useCssVar, useIdle, useWindowSize } from "@vueuse/core";

const route: any = useRoute();
const { t } = useI18n();
const siteName = "elektron.art";
const { idle } = useIdle(3000); // 3 seconds idle

const { height } = useWindowSize();
const appHeight = useCssVar("--app-height");
watch(height, (newHeight) => (appHeight.value = `${newHeight}px`), {
  immediate: true,
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const titleTemplate = (title: string | undefined) =>
  title ? `${title} – ${siteName}` : siteName;

// useHead({
//   title: titleTemplate(route.meta.title),
//   // viewport: "width=device-width, initial-scale=1, maximum-scale=1",
//   link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
//   meta: [{ name: "og:title", content: titleTemplate(route.meta.title) }],
// });
const title = computed(() =>
  titleTemplate(t(route.meta.title ?? "elektron.art")),
);
console.log("title", route.meta.title);
</script>
<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body :class="{ idle: idle }">
      <main
        class="main"
        :class="{
          indexPage: $route.fullPath === '/',
          isLive: isLive,
          breadCumbs: breadcrumbs.length > 0,
        }"
      >
        <Nav />
        <Breadcrumbs />
        <slot />
        <UserInfo />
        <EWindowBorder />
        <DraggableChat />
      </main>
    </Body>
  </Html>
</template>

<style scoped>
.main {
  /* position: relative; */
  display: flex;
  min-height: 100vh;
  /* height: 100vh; */
  flex-direction: column;
  padding-top: calc(var(--h-9) * 2);
}

@media only screen and (max-width: 599px) {
  .main.isLive {
    padding-top: calc(var(--h-9) * 2);
  }
}
@media only screen and (min-width: 600px) {
  .main {
    padding-top: var(--h-9);
  }
  .main.breadCumbs {
    padding-top: calc(var(--h-9) + var(--h-6));
  }
}
</style>
