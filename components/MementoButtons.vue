<script lang="ts" setup>
type Props = {
  controls: {
    label: string;
    channel: string;
    type: string;
  }[];
};

const { controls } = defineProps<Props>();
</script>

<template>
  <div class="MementoButtons">
    <button v-for="control in controls" className="MementoButton">
      <svg>
        <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">
          {{ control.label }}
        </text>
      </svg>
    </button>
  </div>
</template>

<style>
.MementoButtons {
  display: flex;
  /* gap: var(--p-5); */
  justify-content: space-between;
  padding: var(--p-5);
  flex-wrap: wrap;
}
.MementoButton {
  position: relative;
  background-color: var(--accent);
  border-radius: var(--rounded-DEFAULT);
  width: 30%;
  aspect-ratio: 1 / 1;
}
.MementoButton svg {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  width: 100%;
  height: 100%;
}
.MementoButton svg text {
  font-size: 10vw;
}
.MementoButton:hover {
  filter: brightness(0.8);
}
@media only screen and (min-width: 600px) {
  .MementoButton svg text {
    font-size: 2.6vw;
  }
}
</style>
