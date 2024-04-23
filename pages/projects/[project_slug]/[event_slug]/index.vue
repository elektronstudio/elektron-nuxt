<script setup lang="ts">
const route = useRoute();
const slug = route.params.event_slug;

const { data: event, error } = await useEventBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});
const { t } = useI18n();
const { lang } = useLang();

console.log(event.value.projects[0]);

breadcrumbs.value = [
  {
    title: t("pages.projects"),
    link: "/projects",
  },
  {
    title: event.value.projects[0].titles[lang],
    link: `/projects/${event.value.projects[0].slug}`,
  },
  {
    title: event.value.titles[lang],
    link: `/projects/${event.value.projects[0].slug}/${event.value.slug}`,
  },
];
</script>

<template>
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header class="eventHeader">
      <div class="title">
        <h2 class="ETitle lg">{{ event.titles[lang] }}</h2>
        <h4 v-if="event.authors">{{ event.authors }}</h4>
      </div>
      <EContent
        v-if="event.intros"
        class="Description"
        size="lg"
        :content="event.intros[lang]"
      />
      <div class="buttons">
        <EventButtons size="md" :event="event" />
      </div>
    </header>
    <ImageSlider v-if="event.images" :images="event.images" />
    <main class="mainContent">
      <EBox class="eventContent">
        <!-- TODO: Add metadata -->
        <EDetailsList
          v-if="event.detailss[lang]"
          :details="parseDetails(event.detailss[lang])"
        />
        <EContent :content="event.descriptions[lang]" />
      </EBox>
    </main>
  </article>
  <BackgroundImage
    v-if="event.backgroundImage"
    :image="event.backgroundImage"
  />
</template>

<style scoped>
.eventHeader,
.mainContent {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: 0 var(--p-4);
  color: var(--gray-300);
}

.eventHeader {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}
.mainContent {
  align-content: start;
  grid-template-areas:
    "main"
    "side";
}

.eventHeader .title {
  grid-area: title;
}

.eventHeader .title h2 {
  margin-bottom: var(--m-3);
}

.eventHeader h4 {
  grid-area: subtitle;
  align-self: end;
}

.eventHeader .Description {
  grid-area: description;
}

.eventContent {
  align-self: start;
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
}
.SideContent {
  grid-area: side;
  align-self: start;
}
.SideContent h3 {
  margin-bottom: var(--m-6);
}
.SideContent h3:not(:first-child) {
  margin-top: var(--m-8);
}

.buttons {
  position: fixed;
  bottom: var(--m-2);
  left: var(--m-2);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--gap-1);
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.Description :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .eventHeader,
  .mainContent {
    grid-template-columns: repeat(4, 1fr);
  }
  .eventHeader {
    grid-template-areas:
      "title description description"
      "subtitle description description";
  }

  .mainContent {
    grid-template-areas: "main main main main" "side side side side";
  }
  .eventContent {
    grid-template-areas: "details content";
    grid-template-columns: 2fr 3fr;
  }
  .eventContent .EDetailsList {
    grid-area: details;
  }
  .eventContent .EContent {
    grid-area: content;
  }
  .buttons {
    top: calc(var(--h-9) + var(--h-4));
    right: var(--m-4);
    left: auto;
  }
}
@media only screen and (min-width: 1240px) {
  .eventHeader,
  .mainContent {
    grid-template-columns: repeat(8, 1fr);
  }
  .eventHeader {
    grid-template-areas:
      "title title description description description description . ."
      "subtitle subtitle description description description description . .";
  }
  .mainContent {
    grid-template-areas: "main main main main main side side side";
  }
}
</style>
