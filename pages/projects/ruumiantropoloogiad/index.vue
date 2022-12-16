<script setup lang="ts">
const route = useRoute();
const slug = "ruumiantropoloogiad";
const { data: project, error } = await useProjectBySlug(slug as string);
const { data: events } = await useAnthropologies();

// TODO: Make this more dynamic
useHead({
  title: `${project.value.title} – elektron.art`,
});

breadcrumbs.value = [
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: project.value.title,
    link: `/projects/${project.value.slug}`,
  },
];

// const project = data.value as Project;
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header class="eventHeader">
      <div class="eventTitles">
        <h2 class="ETitle lg">{{ project.titles[lang] }}</h2>
        <ETitle v-if="project.authors" el="h5" size="xs">
          {{ project.authors }}
        </ETitle>
      </div>

      <EContent
        v-if="project.intros[lang]"
        class="eventDescription"
        size="lg"
        :content="project.intros[lang]"
      />
    </header>
    <main class="mainContent">
      <EBox class="eventDetails">
        <EDetailsList
          v-if="project.detailss[lang]"
          :details="parseDetails(project.detailss[lang])"
        />
        <EContent el="div" :content="project.descriptions[lang]" />
      </EBox>
      <EImageCard :media="project.thumbnail" ratio="16 / 9" />
      <div class="eventItems">
        <NuxtLink
          v-for="event in events"
          :href="`/projects/ruumiantropoloogiad/${event.slug}`"
          class="eventItem EBox accent"
        >
          <ETitle v-if="event.title" el="h3" size="lg">
            {{ event.title }}
          </ETitle>
          <span>Read more</span>
        </NuxtLink>
        <EBox class="eventItem">
          <ETitle el="h3" size="lg"> Kelli Gedvili veeb </ETitle>
          <EButton
            el="a"
            href="https://www.post-gallery.online/elektron/index.html?fbclid=IwAR0HOV0gbMvOkL9t2aDqB47XQHMwfWdcNgS6NUpANZfzA0sBDZSWVjRE0ss"
            size="xs"
            color="accent"
          >
            <Icon name="radix-icons:external-link" />
            {{ ["Link to website", "Veebilehele"][lang] }}
          </EButton>
        </EBox>
      </div>
    </main>
  </article>
</template>

<style scoped>
.eventHeader,
.mainContent {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-4);
  color: var(--gray-300);
  padding: 0 var(--p-4);
}

.eventHeader {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}

.eventHeader .eventTitles {
  grid-area: title;
}
.eventHeader .eventTitles h2 {
  margin-bottom: var(--m-3);
}

.eventHeader h4 {
  grid-area: subtitle;
  align-self: end;
}

.eventHeader .eventDescription {
  grid-area: description;
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.eventDescription :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .eventHeader,
  .mainContent {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .eventHeader {
    grid-template-areas:
      "title description description description"
      "subtitle description description description";
  }

  .mainContent {
    grid-template-areas: ". main main main";
  }
  .mainContent > .eventDetails {
    grid-area: main;
  }
  .mainContent .EImageCard {
    grid-area: visual;
    align-self: start;
  }
  .mainContent .eventItems {
    grid-area: items;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--gap-5);
  }
  .eventItem {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
}
@media only screen and (min-width: 1240px) {
  .eventHeader,
  .mainContent {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .eventHeader {
    grid-template-areas:
      "title title title description description description description description"
      "subtitle subtitle subtitle description description description description description";
  }
  .eventDetails {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-areas: "details details content content content";
  }
  .eventDetails > .EDetailsList {
    grid-area: details;
  }
  .eventDetails > .EContent {
    grid-area: content;
  }
  .mainContent {
    grid-template-areas: ". . . main main main main main" "visual visual visual visual items items items items";
  }
}
</style>
