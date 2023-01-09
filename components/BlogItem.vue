<script lang="ts" setup>
type Props = {
  slug: string;
  thumbnail: {
    url: string;
  };
  title: string;
};

const { slug, thumbnail, title } = defineProps<Props>();
const { lang } = useLang();
</script>

<template>
  <NuxtLink :href="`/blog/${slug}`" class="blogItem EBox">
    <img v-if="thumbnail" class="postThumbnail" :src="thumbnail.url" />
    <ETitle v-if="title" el="h3" size="lg">
      {{ title }}
    </ETitle>
    <EButton color="accent" size="xs">{{
      ["Read more", "Loe postitust"][lang]
    }}</EButton>
  </NuxtLink>
</template>

<style scoped>
.blogItem {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.postThumbnail {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
}

.blogItem:hover .postThumbnail {
  opacity: 1;
}
</style>
