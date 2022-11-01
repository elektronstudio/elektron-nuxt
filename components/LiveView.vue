<script setup lang="ts">
import { Draggable } from "~~/composables/draggables";
import { Event } from "~~/types";

type Props = {
  data: Draggable[];
  event: Event;
};

const { data } = defineProps<Props>();
const draggablesState = ref<Draggable[]>(data);

const { updateDraggablesDesktop, updateDraggablesMobile } = useLive({
  data,
  draggablesState,
});

const mobile = breakpoints.smaller("large");

const draggableMaximised = computed(
  () => !!draggablesState.value.find((draggable) => draggable.isMaximised),
);
</script>

<template>
  <EBreadBoard>
    <template v-if="mobile">
      <template
        v-for="draggable in draggablesState"
        :key="draggable.draggableId"
      >
        <EDraggableMobile
          :draggable="draggable"
          @update-draggables="updateDraggablesMobile"
        >
          <DraggableContent
            v-if="draggable.contentType"
            :content-type="draggable.contentType"
            :data="draggable.data"
          />
        </EDraggableMobile>
      </template>
    </template>
    <template v-else>
      <template
        v-for="draggable in draggablesState"
        :key="draggable.draggableId"
      >
        <EDraggable
          :draggable="draggable"
          @update-draggables="updateDraggablesDesktop"
        >
          <DraggableContent
            v-if="draggable.contentType"
            :content-type="draggable.contentType"
            :data="draggable.data"
          />
        </EDraggable>
      </template>
    </template>

    <DraggablesDock
      v-if="mobile"
      :draggable-maximised="draggableMaximised"
      :draggables="draggablesState"
      :mobile="mobile"
      @update-draggables="updateDraggablesMobile"
    />
    <DraggablesDock
      v-else
      :draggable-maximised="draggableMaximised"
      :draggables="draggablesState"
      @update-draggables="updateDraggablesDesktop"
    />
  </EBreadBoard>
</template>
