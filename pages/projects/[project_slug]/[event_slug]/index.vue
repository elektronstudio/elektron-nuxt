<script setup lang="ts">
const route = useRoute();
const slug = route.params.event_slug;

const { data: event, error } = await useEventBySlug(slug as string);
// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});

const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header>
      <div class="title">
        <!-- <NuxtLink v-if="event.projectLink" :to="event.projectLink">
          <EButton size="xs" el="a" color="transparent">
            <Icon name="radix-icons:arrow-left" />
            {{ event.projects[0].titles[lang] }}
          </EButton>
        </NuxtLink> -->
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
        <EventButtons :event="event" />
      </div>
    </header>
    <ImageSlider v-if="event.images" :images="event.images" />
    <main>
      <EBox class="MainContent">
        <!-- @TODO: Add metadata -->
        <EDetailsList
          v-if="event.detailss[lang]"
          :details="parseDetails(event.detailss[lang])"
        />
        <EContent :content="event.descriptions[lang]" />
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
    "description"
    "buttons";
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
  justify-content: flex-end;
  gap: var(--gap-5);
  grid-area: buttons;
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
      "title description description buttons"
      "subtitle description description buttons";
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
      "title title description description description description buttons buttons"
      "subtitle subtitle description description description description buttons buttons";
  }
  .Page.SingleProduction main {
    grid-template-areas: "main main main main main side side side";
  }
}
</style>
