<script setup lang="ts">
import type { DraggableProps } from "~~/types";

const { titles } = defineProps<DraggableProps>();
const { lang } = useLang();
</script>

<template>
  <Transition>
    <div class="EDraggableMobile">
      <div class="titleBar" ref="draggableRef">
        <EDraggableTitlebar :title="titles?.[lang]" />
      </div>
      <article>
        <slot />
      </article>
    </div>
  </Transition>
</template>

<style scoped>
.EDraggableMobile {
  position: relative;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.titleBar {
  z-index: 1;
}

.EDraggableMobile.v-enter-active *,
.EDraggableMobile.v-leave-active * {
  display: none;
}
.EDraggableMobile article {
  display: flex;
  padding-top: var(--h-6);
  flex-grow: 1;
  overflow-y: auto;
}

.EDraggableMobile button {
  z-index: 2;
  height: var(--h-6);
  width: var(--w-6);
  position: absolute;
  top: 0;
  right: 0;
}
.EDraggableMobile button:hover {
  background-color: var(--gray-300);
}
</style>
