<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { Ref } from "vue";

type ContentType = "chat" | "text" | "image" | "video" | "event";

// TODO: How to import type here & make this dry
type Draggable = {
  titles: string[];
  contentType?: ContentType;
  initialX: number;
  initialY: number;
  tilesWidth?: number;
  tilesHeight?: number;
  maximisable?: boolean;
  docked?: boolean;
  maximised?: boolean;
  hideTitleBarOnIdle?: boolean;
  id: string;
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
  x,
  y,
  id,
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
  getTop,
} = defineProps<Draggable>();

const { lang } = useLang();

const draggableRef = ref<HTMLElement | null>(null);
// const mobile = breakpoints.smaller("large");
const { width: windowWidth } = useWindow();
const tileDivider = 20;
const tileSize = ref(windowWidth.value / tileDivider);
const finalAnimation = ref<DOMRect | undefined>();

const {
  x: draggableX,
  y: draggableY,
  style,
  isDragging,
} = useDraggable(draggableRef, {
  preventDefault: true,
  onEnd: () => {
    calculateCoordinates();
    // updateXY({
    //   x: snappedX.value,
    //   y: snappedY.value,
    // });
  },
});

// const snappedX = computed(() => Math.round(draggableX.value / tileSize.value));
// const snappedY = computed(() => Math.round(draggableY.value / tileSize.value));

const calculateCoordinates = function () {
  tileSize.value = windowWidth.value / tileDivider;
  const snappedX = Math.round(draggableX.value / tileSize.value);
  const snappedY = Math.round(draggableY.value / tileSize.value);
  draggableX.value =
    snappedX + tilesWidth >= tileDivider
      ? (tileDivider - tilesWidth) * tileSize.value
      : snappedX >= 0
      ? tileSize.value * snappedX
      : 0;
  draggableY.value = snappedY >= 0 ? tileSize.value * snappedY : 0;
};

const handleResize = () => {
  calculateCoordinates();
};

onMounted(() => {
  draggableX.value = tileSize.value * x.value;
  draggableY.value = tileSize.value * y.value;

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function findCoordinates(el: Element, done: () => void) {
  // @TODO: Find a better solution for this
  // Consider using refs for selectors
  console.log(`.DraggablesDock .EDraggableTitlebar[data-id="${id}"]`);
  const $draggableDocked = document.querySelector(
    `.DraggablesDock .EDraggableTitlebar[data-id="${id}"]`,
  );
  console.log($draggableDocked);
  const draggableDockedRect = $draggableDocked?.getBoundingClientRect();
  finalAnimation.value = draggableDockedRect;

  el.addEventListener("animationend", () => {
    done();
  });
}
</script>

<template>
  <Transition @enter="findCoordinates" @leave="findCoordinates">
    <div
      class="EDraggable"
      :style="style"
      style="touch-action: none"
      :class="{
        isDragging: isDragging,
        noHeight: !tilesHeight,
        maximised: getMaximised(),
        hideTitleBarOnIdle: hideTitleBarOnIdle,
      }"
      v-show="!getDocked()"
      @click.stop="updateIndex()"
    >
      <nav class="topBarNav">
        <ETitlebarButton
          v-if="maximisable"
          icon="size"
          @click.stop="toggleMaximised()"
        />
        <ETitlebarButton icon="minus" @click.stop="setDocked()" />
      </nav>
      <div class="titleBar" ref="draggableRef">
        <EDraggableTitlebar
          :title="titles[lang]"
          :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
        />
      </div>
      <article
        :style="{
          height: tilesHeight
            ? `calc(${tilesHeight} * var(--breadboard-tile-size) - var(--h-6))`
            : 'auto',
        }"
      >
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

.EDraggable {
  position: relative;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
}
.EDraggable.isDragging {
  z-index: 100;
}
.topBarNav {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}

/* @TODO: Add breakpoints system */
@media only screen and (max-width: 899px) {
  .EDraggable {
    top: auto !important;
    left: auto !important;
    flex-grow: 1;
  }
  .EDraggable article {
    position: absolute;
    width: 100%;
    height: 100% !important;
    padding-top: var(--h-6);
    flex-grow: 1;
    overflow-y: auto;
  }
}
@media only screen and (min-width: 900px) {
  .EDraggable {
    position: fixed;
    width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
    height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    touch-action: none;
    border: 1px solid transparent;
    z-index: calc(v-bind("getIndex()") + 1);
  }
  .EDraggable article {
    flex-grow: 1;
    overflow-y: auto;
  }
  .EDraggable.noHeight {
    height: auto;
  }
  .EDraggable.maximised {
    width: 100%;
    height: 100%;
    top: 0 !important;
    left: 0 !important;
  }
  .EDraggable.maximised article,
  /* @TODO: How to select an Art only component */
  .EDraggable.maximised article :deep(.videoStream),
  .EDraggable.maximised :deep(video) {
    height: 100%;
  }
  .EDraggable.maximised video {
    object-fit: contain;
  }
  .EDraggable:hover {
    border: 1px solid var(--gray-500);
  }
  .EDraggable.hideTitleBarOnIdle .titleBar {
    position: absolute;
    z-index: 1;
    width: 100%;
  }
  .EDraggable.hideTitleBarOnIdle:hover :is(.titleBar, .topBarNav) {
    opacity: 1;
  }
  .idle .EDraggable.maximised :is(.titleBar, .topBarNav),
  .EDraggable.hideTitleBarOnIdle :is(.titleBar, .topBarNav) {
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  .EDraggable.hideTitleBarOnIdle article {
    padding-top: 0;
  }
  @keyframes windowAnimation {
    0% {
      width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
      height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    }
    100% {
      top: v-bind("`${finalAnimation?.y ? finalAnimation.y : 0}px`");
      left: v-bind(
        "`calc(${finalAnimation?.x ? finalAnimation.x : 0}px + var(--dock-item-size) / 2)`"
      );
      width: 0;
      height: var(--h-6);
      opacity: 0;
    }
  }
}

.EDraggable.v-enter-active {
  animation: windowAnimation 0.5s ease-in-out reverse;
}

.EDraggable.v-leave-active {
  animation: windowAnimation 0.5s ease-in-out forwards;
}
.EDraggable.v-enter-active *,
.EDraggable.v-leave-active * {
  display: none;
}
</style>
