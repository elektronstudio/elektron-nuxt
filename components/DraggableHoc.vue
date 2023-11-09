<script setup lang="ts">
import type { DraggableProps } from "~~/types";
import EDraggable from "~~/components/e/Draggable.client.vue";
import EDraggableMobile from "~~/components/e/DraggableMobile.client.vue";

const props = defineProps<DraggableProps>();
</script>

<template>
  <EDraggableMobile v-if="mobile" v-bind="props"><slot /></EDraggableMobile>
  <EDraggable v-else v-bind="props"><slot /></EDraggable>
</template>
