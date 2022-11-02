<script setup lang="ts">
import { Ref } from "vue";

type ContentType = "chat" | "text" | "image" | "video" | "event";

// TODO: How to import type here & make this dry
type Draggable = {
  titles: string[];
  draggableId: string;
  contentType?: ContentType;
  initialX: number;
  initialY: number;
  tilesWidth?: number;
  tilesHeight?: number;
  maximisable?: boolean;
  docked?: boolean;
  maximised?: boolean;
  hideTitleBarOnIdle?: boolean;
  x: Ref<number>;
  y: Ref<number>;
  updateXY: Function;
  getDocked: Function;
  setDocked: Function;
  getIndex: Function;
  getMaximised: Function;
  toggleMaximised: Function;
  updateIndex: Function;
  getTop: Function;
};

const {
  titles,
  draggableId,
  x,
  y,
  tilesWidth = 1,
  tilesHeight,
  maximisable = false,
  hideTitleBarOnIdle,
  updateXY,
  getDocked,
  setDocked,
  getIndex,
  getMaximised,
  toggleMaximised,
  updateIndex,
} = defineProps<Draggable>();
const { lang } = useLang();
</script>

<template>
  <Transition>
    <div class="EDraggableMobile" v-show="!getDocked()">
      <button @click.stop="">
        <Icon name="radix-icons:cross-2" />
      </button>
      <div class="titleBar" ref="draggableRef">
        <EDraggableTitlebar :title="titles[lang]" />
      </div>
      <article>
        <slot />
      </article>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes windowAnimation {
  0% {
    width: 100%;
    height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    top: 0;
    left: 50%;
    transform: translate(-50%);
  }
  75% {
    opacity: 1;
  }
  100% {
    width: 0;
    height: var(--h-6);
    top: calc(100vh - var(--h-6));
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
  }
}
.EDraggableMobile {
  position: relative;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* z-index: calc(v-bind(order) + 1); */
}
.titleBar {
  z-index: 1;
}
.EDraggableMobile.v-enter-active {
  animation: windowAnimation 0.5s ease-in-out reverse;
}

.EDraggableMobile.v-leave-active {
  animation: windowAnimation 0.5s ease-in-out forwards;
}
.EDraggableMobile.v-enter-active *,
.EDraggableMobile.v-leave-active * {
  display: none;
}
.EDraggableMobile article {
  position: absolute;
  width: 100%;
  height: 100%;
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
