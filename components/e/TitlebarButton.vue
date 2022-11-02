<script setup lang="ts">
type Props = {
  icon: "size" | "minus" | "plus" | "cross";
};

const { icon } = defineProps<Props>();
const iconMap = {
  size: "radix-icons:size",
  minus: "radix-icons:minus",
  plus: "radix-icons:plus",
  cross: "radix-icons:cross-2",
};
</script>

<template>
  <button class="ETitlebarButton">
    <Icon :name="iconMap[icon ? icon : 'plus']" />
  </button>
</template>

<style scoped>
.ETitlebarButton {
  height: var(--h-6);
  width: var(--w-6);
  display: grid;
  place-content: center;
}
.ETitlebarButton svg {
  width: 1em;
  height: 1em;
}
.ETitlebarButton:hover {
  background-color: var(--gray-300);
}
</style>
