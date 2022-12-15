<script setup lang="ts">
const route = useRoute();
const slug = route.params.event_slug;

const { data: event, error } = await useAnthropologiesBySlug(slug as string);

// TODO: Make this more dynamic
useHead({
  title: `${event.value.title} – elektron.art`,
});
const { lang } = useLang();

breadcrumbs.value = [
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: ["Anthropologies of space", "Ruumiantropoloogiad"][lang.value],
    link: `/projects/ruumiantropoloogiad`,
  },
  {
    title: event.value.title,
    link: `/projects/ruumiantropoloogiad/${event.value.slug}`,
  },
];
</script>

<template>
  <BackgroundImage
    v-if="event.backgroundImage"
    :image="event.backgroundImage"
  />
  <ErrorCard v-if="error" />
  <article v-else class="Page SingleProduction">
    <header class="eventHeader">
      <div class="eventTitles">
        <h2 class="ETitle lg">{{ event.titles[lang] }}</h2>
        <h4 v-if="event.authors">{{ event.authors }}</h4>
      </div>
      <EBox class="eventDetails">
        <EDetailsList
          v-if="event.detailss[lang]"
          :details="parseDetails(event.detailss[lang])"
        />
        <EContent :content="event.descriptions[lang]" />
      </EBox>
    </header>
    <ImageSlider v-if="event.images" :images="event.images" />
    <ContentBlocks
      :key="lang"
      :cards="lang === 0 ? event.cards : event.localizations[0].cards"
    />
  </article>
</template>

<style scoped>
.eventHeader {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gap-5);
  padding: var(--p-4);
  color: var(--gray-300);
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
.eventHeader .eventDetails {
  grid-area: details;
}
.Page.SingleProduction main {
  align-content: start;
  grid-template-areas:
    "main"
    "side";
}

.Page.SingleProduction header .eventTitles h2 {
  margin-bottom: var(--m-3);
}

.Page.SingleProduction header h4 {
  grid-area: subtitle;
  align-self: end;
}

.Page.SingleProduction header .Description {
  grid-area: description;
}

.mainContent {
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
  flex-direction: column;
  align-items: flex-end;
  /* justify-content: flex-end; */
  gap: var(--gap-1);
  grid-area: buttons;
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.Description :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .eventHeader {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .eventHeader {
    grid-template-areas: "title details details details";
  }
  .eventDetails {
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (min-width: 1240px) {
  .eventHeader {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .eventHeader {
    grid-template-areas: "title title title details details details details details";
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
}
</style>
