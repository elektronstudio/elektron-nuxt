<script setup lang="ts">
const route = useRoute();
const slug = route.params.project_slug;

const { data: project, error } = await useProjectBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${project.value.title} – elektron.art`,
});
const { t } = useI18n();
const { lang } = useLang();
breadcrumbs.value = [
  {
    title: t("pages.projects"),
    link: "/projects",
  },
  {
    title: project.value.titles[lang],
    link: `/projects/${project.value.slug}`,
  },
];
</script>

<template>
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header class="eventHeader">
      <div class="title">
        <h2 class="ETitle lg">{{ project.titles[lang] }}</h2>
        <ETitle v-if="project.authors" el="h5" size="xs">
          {{ project.authors }}
        </ETitle>
      </div>

      <EContent
        v-if="project.intros[lang]"
        class="Description"
        size="lg"
        :content="project.intros[lang]"
      />
      <div v-if="project" class="buttons">
        <EventButtons size="md" :event="project" />
      </div>
    </header>

    <ImageSlider v-if="project.images" :images="project.images" />
    <main class="mainContent">
      <EBox class="eventContent">
        <EDetailsList
          v-if="project.detailss[lang]"
          :details="parseDetails(project.detailss[lang])"
        />
        <EContent el="div" :content="project.descriptions[lang]" />
      </EBox>
      <EBox v-if="project.events" class="sideContent" el="aside">
        <template v-if="project.events">
          <EventCard
            v-for="event in project.events"
            :event="event"
            layout="vertical"
            :no-buttons="true"
          />
        </template>
      </EBox>
    </main>
  </article>
  <BackgroundImage
    v-if="project.backgroundImage"
    :image="project.backgroundImage"
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
.sideContent {
  grid-area: side;
  align-self: start;
}
.sideContent h3 {
  margin-bottom: var(--m-6);
}
.sideContent h3:not(:first-child) {
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
