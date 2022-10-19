<script setup lang="ts">
import { MediaItem } from "~~/types";

type Props = {
  media: MediaItem;
};

const { media } = defineProps<Props>();
</script>

<template>
  <EBox class="EImageCard" layout="columns1">
    <EImage :media="media" />
  </EBox>
</template>

<style scoped>
.EBox {
  padding: 0;
  overflow: hidden;
}
.EBox .EImage {
  object-fit: cover;
}
</style>
