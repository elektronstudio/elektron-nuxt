<script setup lang="ts">
import { MediaItem } from "~~/types";

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
        <NuxtLink :to="project.projectLink">
          <ETitle el="h3">
            {{ project.titles[lang] }}
          </ETitle>
        </NuxtLink>
        <EContent :content="project.intros[lang]" />
      </EStack>
      <footer>
        <template>
          <NuxtLink :to="project.projectLink">
            <EButton size="xs" el="a" color="transparent">
              <Icon name="radix-icons:arrow-right" />
              {{ ["View project", "Vaata projekti"][lang] }}
            </EButton>
          </NuxtLink>
        </template>
      </footer>
    </aside>
    <EImage
      v-if="project.thumbnail"
      :media="(project.thumbnail as MediaItem)"
    />
  </PinnedItem>
</template>
