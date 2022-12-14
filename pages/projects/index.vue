<script setup lang="ts">
definePageMeta({
  title: "Projects",
});

breadcrumbs.value = [
  {
    title: "Projects",
  },
];

const { data: currentProjects, error: currentError } = await useProjects({
  filters: { slug: { $notIn: ["signal", "kohe2022"] }, pinned: { $eq: true } },
});
const { data: pastProjects, error: pastError } = await useProjects({
  filters: { slug: { $notIn: ["signal", "kohe2022"] }, pinned: { $eq: false } },
});
const { lang } = useLang();
</script>

<template>
  <ErrorCard v-if="currentError || pastError" />
  <div v-else class="Page">
    <ETitle size="lg" v-if="currentProjects.length > 0">
      {{ ["Projects", "Projektid"][lang] }}
    </ETitle>
    <br />
    <div v-if="currentProjects.length > 0" class="projects">
      <template v-for="project in currentProjects">
        <NuxtLink v-if="!project.archived" :to="'/projects/' + project.slug">
          <!-- TODO: Format this, and show only future dates, needs order by event time -->
          <ProjectCard
            :title="project.titles[lang]"
            :media="project.thumbnail"
            :next-event="project.events?.length && project.events[0]"
          />
        </NuxtLink>
      </template>
    </div>
    <ETitle size="lg" v-if="pastProjects.length > 0">
      {{ ["Archive", "Arhiiv"][lang] }}
    </ETitle>
    <br />

    <div v-if="pastProjects.length > 0" class="projects">
      <template v-for="project in pastProjects">
        <NuxtLink :to="'/projects/' + project.slug">
          <ProjectCard
            :title="project.titles[lang]"
            :media="project.thumbnail"
          />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.Page {
  padding: var(--p-4);
}

.projects {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gap-4);
}
.projects:not(:last-child) {
  margin-bottom: var(--m-12);
}
@media only screen and (min-width: 600px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 1000px) {
  .projects {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
