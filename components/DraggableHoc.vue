<script setup lang="ts">
import EDraggable from "~~/components/e/Draggable.client.vue";
import EDraggableMobile from "~~/components/e/DraggableMobile.client.vue";

const props = defineProps();
</script>

<template>
  <component :is="mobile ? EDraggableMobile : EDraggable" v-bind="props">
    <slot />
  </component>
</template>
