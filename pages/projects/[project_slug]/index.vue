<script setup lang="ts">
const route = useRoute();
const slug = route.params.project_slug;

const { data: project, error } = await useProjectBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${project.value.title} – elektron.art`,
});

// const project = data.value as Project;
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header>
      <div class="title">
        <!-- <NuxtLink to="/projects">
          <EButton size="xs" el="a" color="transparent">
            <Icon name="radix-icons:arrow-left" />
            {{ ["Projects", "Projektid"][lang] }}
          </EButton>
        </NuxtLink> -->
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
    </header>

    <ImageSlider v-if="project.images" :images="project.images" />
    <main>
      <EBox class="MainContent">
        <EDetailsList
          v-if="project.detailss[lang]"
          :details="parseDetails(project.detailss[lang])"
        />
        <EContent el="div" :content="project.descriptions[lang]" />
      </EBox>
      <EBox v-if="project.events" class="SideContent" el="aside">
        <template v-if="project.events">
          <ETitle el="h3" size="lg">
            {{ ["Events", "Üritused"][lang] }}
          </ETitle>

          <EventCard
            v-for="event in project.events"
            :event="event"
            :project-thumbnail="project.thumbnail"
            layout="vertical"
          />
        </template>

        <!-- <template v-if="project.pastEvents">
          <ETitle
            el="h3"
            size="lg"
            :title="['Past events', 'Toimunud üritused'][lang]"
          />
          <EventCard
            v-for="event in project.pastEvents"
            :event="event"
            :project-thumbnail="project.thumbnail"
            layout="vertical"
          />
        </template> -->
        <!-- @TODO: Add press -->
        <!-- <template v-if="press">
          <ETitle el="h3" size="lg">Press</ETitle>
          <EPressItems :items="press" />
        </template> -->
      </EBox>
    </main>
  </article>
</template>

<style scoped>
.Page.SingleProduction header,
.Page.SingleProduction main {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: var(--p-4);
  color: var(--gray-300);
}

.Page.SingleProduction header {
  grid-template-areas:
    "title"
    "subtitle"
    "description";
}
.Page.SingleProduction main {
  align-content: start;
  grid-template-areas:
    "main"
    "side";
}

.Page.SingleProduction header .title {
  grid-area: title;
}
.Page.SingleProduction header .title h2 {
  margin-bottom: var(--m-3);
}

.Page.SingleProduction header h4 {
  grid-area: subtitle;
  align-self: end;
}

.Page.SingleProduction header .Description {
  grid-area: description;
}

.MainContent {
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
  display: flex;
  align-items: flex-start;
  gap: var(--gap-5);
}

/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.Description :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .Page.SingleProduction header,
  .Page.SingleProduction main {
    grid-template-columns: repeat(4, 1fr);
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
    grid-template-areas: "details content";
    grid-template-columns: 2fr 3fr;
  }
  .MainContent .EDetailsList {
    grid-area: details;
  }
  .MainContent .EContent {
    grid-area: content;
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
