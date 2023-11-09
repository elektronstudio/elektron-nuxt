<script setup lang="ts">
import type { DraggablesList } from "~~/types";

type Props = {
  draggables: DraggablesList;
};

const { draggables } = defineProps<Props>();
const { lang } = useLang();

const handleClick = (d: any) => {
  if (d.getDocked()) {
    d.setDocked();
  } else {
    d.updateIndex();
  }
};
</script>

<template>
  <TransitionGroup class="DraggablesDock" name="dock" tag="nav">
    <EDraggableTitlebar
      v-for="d in draggables"
      v-show="mobile ? d.getDocked() : true"
      :title="d.titles?.[lang]"
      @click="handleClick(d)"
      :data-id="d.id"
      :key="d.id"
      :class="{ isTop: d.getTop() }"
    >
      <Transition name="fade">
        <EChatBadge
          v-if="d.contentType === 'chat' && newMessages > 0"
          :new-messages="newMessages"
        />
      </Transition>
    </EDraggableTitlebar>
  </TransitionGroup>
</template>

<style scoped>
.DraggablesDock {
  flex-flow: wrap;
  flex-direction: column-reverse;
  transform: translateY(0%);
  transition: transform 0.3s ease-in-out;
  width: 100%;
  z-index: 1000;
  display: none;
}

/* TODO: Add breakpoints system */

@media only screen and (max-width: 899px) {
  .DraggablesDock {
    margin-top: auto;
  }
  .DraggablesDock > * {
    width: 100%;
  }
  .EDraggableTitlebar {
    border-top: 1px solid var(--gray-500);
  }
}
@media only screen and (min-width: 900px) {
  .DraggablesDock {
    display: flex;
    flex-flow: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-left: var(--breadboard-tile-size);
    padding-right: var(--gap-3);
  }
  .DraggablesDock > * {
    display: inline-flex;
    margin-right: var(--m-3);
    width: var(--dock-item-size);
    flex-shrink: 0;
    border: 1px solid var(--gray-500);
    border-bottom: 0;
    cursor: pointer;
  }
  .DraggablesDock .isTop {
    background-color: var(--gray-600);
  }
  .idle .DraggablesDock {
    transform: translateY(100%);
  }
}
.dock-enter-active,
.dock-leave-active {
  /* transform: scale(1); */
  transition: 0.2s ease-in-out;
}

.dock-enter-from,
.dock-leave-to {
  /* transform: scale(0); */
  height: 0;
}

.dock-enter-active {
  transition-delay: 0.2s;
}

@media only screen and (min-width: 1000px) {
  .dock-enter-from,
  .dock-leave-to {
    width: 0;
    translate: scale(1);
  }
  .DraggablesDock {
    padding-left: var(--breadboard-tile-size);
  }
}
</style>
