<script setup lang="ts">
type Props = {
  title?: string;
};

const { title } = defineProps<Props>();
const emit = defineEmits<{
  (e: "close-dialog"): void;
}>();
</script>

<template>
  <dialog class="EDialog">
    <EDraggableTitlebar :title="title">
      <ETitlebarButton icon="cross" @click.stop="emit('close-dialog')" />
    </EDraggableTitlebar>
    <article class="wrapper">
      <slot />
    </article>
  </dialog>
</template>

<style scoped>
.EDialog {
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  left: auto;
  color: var(--fg);
  border: 1px solid var(--gray-500);
}

.EDialog:hover {
  border: 1px solid var(--gray-500);
}
</style>
