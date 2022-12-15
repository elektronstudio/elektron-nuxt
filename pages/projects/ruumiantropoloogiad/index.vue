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
    <main class="MainContent">
      <EBox>
        <EDetailsList
          v-if="project.detailss[lang]"
          :details="parseDetails(project.detailss[lang])"
        />
        <EContent el="div" :content="project.descriptions[lang]" />
      </EBox>
      <EImageCard :media="project.thumbnail" ratio="16 / 9" />
      <div class="Items">
        <EBox v-for="event in events" class="EventItem" color="accent">
          <ETitle v-if="event.title" el="h3" size="lg">
            {{ event.title }}
          </ETitle>
          <span>Read more</span>
        </EBox>
        <EBox class="EventItem">
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
.Page.SingleProduction header,
.MainContent {
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

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.Description :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .Page.SingleProduction header,
  .MainContent {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title description description description"
      "subtitle description description description";
  }

  .MainContent {
    grid-template-areas: ". main main main";
  }
  .MainContent > .EBox {
    grid-area: main;
  }
  .MainContent .EImageCard {
    grid-area: visual;
    align-self: start;
  }
  .MainContent .Items {
    grid-area: items;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--gap-5);
  }
  .EventItem {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
}
@media only screen and (min-width: 1240px) {
  .Page.SingleProduction header,
  .MainContent {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .Page.SingleProduction header {
    grid-template-areas:
      "title title title description description description description description"
      "subtitle subtitle subtitle description description description description description";
  }
  .MainContent > .EBox {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-areas: "details details content content content";
  }
  .MainContent > .EBox > .EDetailsList {
    grid-area: details;
  }
  .MainContent > .EBox > .EContent {
    grid-area: content;
  }
  .MainContent {
    grid-template-areas: ". . . main main main main main" "visual visual visual visual items items items items";
  }
}
</style>
