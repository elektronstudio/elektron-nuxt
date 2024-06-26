<script setup lang="ts">
import { useElementSize, useMouseInElement } from "@vueuse/core";
import { scaleLinear, scaleTime } from "d3";

type Props = {
  data: any;
  username?: string | null;
};
const { data, username } = withDefaults(defineProps<Props>(), {
  username: null,
});

const useScrubber = (container, svg) => {
  const currentXTime = inject("currentXTime", ref(null));

  const { width } = useElementSize(container);
  const height = ref(50);

  const { elementX: scrubX } = useMouseInElement(svg);
  const currentX = ref(null);

  watch(
    currentXTime,
    () => (currentX.value = xScale.value(currentXTime.value)),
  );

  const scrubbing = ref(false);

  const onScrub = () => {
    currentX.value = scrubX.value;
    currentXTime.value = xScale.value.invert(scrubX.value);
  };

  const onMousedown = () => {
    scrubbing.value = true;
    onScrub();
  };
  const onMousemove = () => {
    if (scrubbing.value) {
      onScrub();
    }
  };
  const onMouseup = () => {
    onScrub();
    scrubbing.value = false;
  };
  return {
    width,
    height,
    currentX,
    onMousedown,
    onMousemove,
    onMouseup,
  };
};

const container = ref(null);
const svg = ref(null);

const { width, height, currentX, onMousedown, onMousemove, onMouseup } =
  useScrubber(container, svg);

const xScale = computed(() =>
  scaleTime()
    .domain([new Date(data.xMin), new Date(data.xMax)])
    .range([0, width.value]),
);

const yScale = computed(() =>
  scaleLinear().domain([data.yMin, data.yMax]).range([0, height.value]),
);

const dataWithPath = computed(() => {
  const users = data.users.map((user) => {
    const path = polygonpath(
      user.messages.map((m) => [
        xScale.value(new Date(m.datetime)),
        height.value - yScale.value(m.value),
      ]),
    );
    return { ...user, path };
  });
  return { ...data, users };
});
</script>

<template>
  <div ref="container" class="ControlsGraph">
    <svg
      ref="svg"
      :width="width"
      :height="height"
      @mousedown="onMousedown"
      @mousemove="onMousemove"
      @mouseup="onMouseup"
    >
      <path
        v-for="user in dataWithPath.users"
        :d="user.path"
        fill="none"
        :stroke="user.color"
        :opacity="!username || user.username === username ? 1 : 0.2"
        stroke-width="2"
      />
      <line
        v-if="currentX !== null"
        :x1="currentX"
        y1="0"
        :x2="currentX"
        :y2="height"
      />
    </svg>
  </div>
</template>

<style scoped>
.ControlsGraph {
  height: 100%;
  width: 100%;
}
.ControlsGraph svg {
  background-color: var(--gray-600);
}
.ControlsGraph svg line {
  stroke: var(--error);
}
</style>
