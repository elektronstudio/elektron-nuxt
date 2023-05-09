<script setup lang="ts">
type Props = {
  isOnline: boolean;
  isOnlocation: boolean;
};

const { isOnline, isOnlocation } = defineProps<Props>();
</script>

<template>
  <div class="EventLocations" v-if="isOnline || isOnlocation">
    <span v-if="isOnline"> <Icon name="radix-icons:globe" />Online </span>

    <span v-if="isOnlocation">
      <Icon name="radix-icons:sewing-pin" />Onsite
    </span>
  </div>
</template>

<style scoped>
.EventLocations {
  display: flex;
  gap: var(--gap-2);
  color: var(--gray-300);
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.EventLocations span {
  display: flex;
  align-items: center;
  gap: 0.2em;
}
</style>
