<script setup lang="ts">
type Props = {
  wallpaper?: string;
};
const { wallpaper } = defineProps<Props>();
</script>
<template>
  <div
    class="breadboard"
    :style="{
      backgroundImage: wallpaper ? 'url(' + wallpaper + ')' : '',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.breadboard {
  --pin-size: 1px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--app-height, 100vh);
  background-size: cover !important;
  background-position: 50% 50% !important;
  background: repeating-linear-gradient(
      0.25turn,
      transparent var(--pin-size),
      var(--gray-700) var(--pin-size),
      var(--gray-700) calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) + var(--pin-size))
    ),
    repeating-linear-gradient(
      transparent var(--pin-size),
      var(--gray-700) var(--pin-size),
      var(--gray-700) calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) - var(--pin-size)),
      transparent calc(var(--breadboard-tile-size) + var(--pin-size))
    ),
    repeating-linear-gradient(var(--gray-500), var(--gray-500));
}

@media only screen and (min-width: 900px) {
  .breadboard {
    height: 100%;
  }
}
</style>
