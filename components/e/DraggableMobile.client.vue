<script setup lang="ts">
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
  x: Ref<number>;
  y: Ref<number>;
  updateXY: Function;
  getDocked: Function;
  setDocked: Function;
  setDockedSilent: Function;
  getIndex: Function;
  getMaximised: Function;
  toggleMaximised: Function;
  updateIndex: Function;
  getTop: Function;
};

const { titles, getDocked, setDocked, getIndex, setDockedSilent, getTop } =
  defineProps<Draggable>();
const { lang } = useLang();

const index = computed(() => getIndex());
watch(index, () => {
  if (!getTop()) {
    setDockedSilent(true);
  }
});

onMounted(() => {
  if (getIndex() !== 1) {
    setDockedSilent(true);
  }
});
</script>

<template>
  <Transition>
    <div class="EDraggableMobile">
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
    opacity: 0;
    transform: scale(0.8);
  }
  75% {
    opacity: 1;
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
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
/* .EDraggableMobile.v-enter-active {
  animation: windowAnimation 0.5s ease-in-out reverse;
}

.EDraggableMobile.v-leave-active {
  animation: windowAnimation 0.5s ease-in-out forwards;
} */
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
