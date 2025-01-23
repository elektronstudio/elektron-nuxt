<script setup lang="ts">
type Props = {
  order: number;
  index: number;
  item: any;
};
const { order, item, index } = defineProps<Props>();
</script>

<template>
  <EDialog
    :title="
      event?.urgencyLabel
        ? event.urgencyLabel[lang]
        : `${$t('pinned')}: ${item.title}`
    "
    :key="item.id"
    :dialog-state="dialogState"
    @click="moveToLast(item.id)"
    @close-dialog="closeDialog(index)"
    :style="{
      zIndex: order,
      transform:
        order > 0
          ? `translate(calc(-50% + var(--p-${
              order * 6
            })), calc(-50% + var(--p-${order * 6})))`
          : 'translate(-50%, -50%)',
    }"
  >
    <EventPreview v-if="item.isEvent" :event="item" />
    <ProjectPreview v-if="item.isProject" :project="item" />
  </EDialog>
</template>
