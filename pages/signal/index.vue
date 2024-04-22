<script setup lang="ts">
definePageMeta({
  title: "pages.podcast",
  ttl: 60 * 30,
});

breadcrumbs.value = [];

const { data: podcastPage, error: podcastPageError } = await usePodcastPage();
const { data: podcast, error: podcastError } = await usePodcast();

const { lang } = useLang();
const episodes = computed(() =>
  podcast.value?.items.filter((i) => i.itunes.episode),
);
</script>

<template>
  <ErrorCard v-if="podcastPageError || podcastError" />
  <article v-else class="Page SingleProduction">
    <header>
      <ETitle el="h1" size="lg">
        {{ podcastPage.titles[lang] }}
      </ETitle>
      <h4 v-if="podcastPage.authors">{{ podcastPage.authors }}</h4>

      <EContent
        v-if="podcastPage.intros"
        class="Description"
        size="lg"
        :content="podcastPage.intros[lang]"
      />
    </header>
    <ImageSlider v-if="podcastPage.images" :images="podcastPage.images" />
    <main>
      <EBox class="MainContent">
        <EDetailsList
          v-if="podcastPage.detailss[lang]"
          :details="parseDetails(podcastPage.detailss[lang])"
        />
        <EContent :content="podcastPage.descriptions[lang]" />
      </EBox>
      <EBox v-if="episodes" class="SideContent" el="aside">
        <ETitle el="h3" size="lg">Latest episodes</ETitle>
        <PodcastItem v-for="episode in episodes" :episode="episode" />
      </EBox>
    </main>
  </article>
</template>

<style scoped>
/* TODO: Templatize projects view */
.Page.SingleProduction header,
.Page.SingleProduction main {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: var(--p-4);
  align-items: start;
  color: var(--gray-300);
}

.Page.SingleProduction header {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}

.Page.SingleProduction header h1 {
  grid-area: title;
}

.Page.SingleProduction header h4 {
  grid-area: subtitle;
  align-self: end;
}

.Page.SingleProduction header .Description {
  grid-area: description;
}

.MainContent {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
}
.SideContent {
  align-self: start;
}
.SideContent h3 {
  margin-bottom: var(--m-6);
}
.SideContent h3:not(:first-child) {
  margin-top: var(--m-8);
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.Description :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .Page.SingleProduction header {
    grid-template-columns: repeat(4, 1fr);
  }
  .Page.SingleProduction main {
    grid-template-columns: repeat(2, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title description description description"
      "subtitle description description description";
  }

  .Page.SingleProduction main {
    grid-template-areas: "main main main main" "side side side side";
  }

  .MainContent {
    grid-area: main;
    grid-template-areas: "details content";
    grid-template-columns: 2fr 3fr;
  }
  .MainContent .EDetailsList {
    grid-area: details;
  }
  .MainContent .EContent {
    grid-area: content;
  }

  .SideContent {
    grid-area: side;
  }

  .Page.SingleProduction main {
    grid-template-areas: "main side";
  }
}
@media only screen and (min-width: 1240px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(8, 1fr);
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title title description description description description . ."
      "subtitle subtitle description description description description . .";
  }
  .Page.SingleProduction main {
    grid-template-areas: "main main main main main side side side";
  }
}
</style>
