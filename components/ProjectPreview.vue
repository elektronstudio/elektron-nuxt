<script setup lang="ts">
import type { MediaItem } from "~~/types";

const { lang } = useLang();

type Props = {
  project: any;
};

const { project } = defineProps<Props>();
</script>
<template>
  <PinnedItem>
    <aside>
      <EStack is="header">
        <NuxtLinkLocale :to="project.projectLink">
          <ETitle el="h3">
            {{ project.titles[lang] }}
          </ETitle>
        </NuxtLinkLocale>
        <EContent :content="project.intros[lang]" />
      </EStack>
      <footer>
        <NuxtLinkLocale v-slot="{ href }" :to="project.projectLink" custom>
          <EButton size="xs" el="a" color="accent" :href="href">
            <Icon name="radix-icons:arrow-right" />
            {{ $t("view_project") }}
          </EButton>
        </NuxtLinkLocale>
        <div class="eventButtons">
          <EventButtons :event="project" />
        </div>
      </footer>
    </aside>
    <EImage
      v-if="project.thumbnail"
      :media="(project.thumbnail as MediaItem)"
    />
  </PinnedItem>
</template>
