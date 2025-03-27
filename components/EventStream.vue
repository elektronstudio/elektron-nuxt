<script setup lang="ts">
type Props = {
  event: any;
};

const { event } = defineProps<Props>();
</script>
<template>
  <div class="eventStream">
    <VimeoIframe v-if="event.vimeoId" :id="event.vimeoId" />
    <div class="eventButtons">
      <EventButtons :event="event" />
    </div>
  </div>
</template>

<style scoped>
.eventStream {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eventButtons {
  position: absolute;
  top: var(--p-2);
  right: var(--p-2);
}
</style>
