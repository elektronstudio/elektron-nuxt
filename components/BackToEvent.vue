<script setup lang="ts">
type Props = {
  link: string;
};
const { link } = defineProps<Props>();
</script>
<template>
  <NuxtLinkLocale v-if="link" :to="link" class="backToEvent">
    <Icon name="radix-icons:arrow-left" />
    {{ $t("back_to_event") }}
  </NuxtLinkLocale>
</template>
<style scoped>
.backToEvent {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.backToEvent svg {
  margin-right: var(--m-1);
  width: 1em;
  height: 1em;
}

@media only screen and (max-width: 899px) {
  .backToEvent {
    width: 100%;
    height: var(--h-6);
    background-color: var(--bg);
    border-bottom: 1px solid var(--gray-500);
    padding-left: var(--p-2);
    padding-right: var(--p-6);
  }
}
@media only screen and (min-width: 900px) {
  .backToEvent {
    position: fixed;
    top: var(--p-2);
    left: var(--p-2);
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    color: var(--gray-300);
  }
  .idle .backToEvent {
    opacity: 0;
  }
}
</style>
