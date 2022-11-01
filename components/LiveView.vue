<script setup lang="ts">
import { Draggable } from "~~/composables/draggables";

type Props = {
  data: Draggable[];
  // @TODO Proper type
  event: any;
};

const { data, event } = defineProps<Props>();
const { lang } = useLang();
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
    <NuxtLink v-if="event" :to="event.eventLink" class="backToEvent">
      <Icon name="radix-icons:arrow-left" />
      {{ ["Back to event", "Tagasi sündmuse juurde"][lang] }}
    </NuxtLink>
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

<style scoped>
.backToEvent {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  z-index: 1;
  display: flex;
  align-items: center;
}
.backToEvent svg {
  margin-right: var(--m-1);
  width: 1em;
  height: 1em;
}

@media only screen and (max-width: 899px) {
  .backToEvent {
    width: 100%;
    height: var(--h-6);
    background-color: var(--bg);
    border-bottom: 1px solid var(--gray-500);
    padding-left: var(--p-2);
    padding-right: var(--p-6);
  }
}
@media only screen and (min-width: 900px) {
  .backToEvent {
    position: fixed;
    top: var(--p-2);
    left: var(--p-2);
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    color: var(--gray-300);
  }
  .idle .backToEvent {
    opacity: 0;
  }
}
.EBreadBoard {
  height: var(--app-height, 100vh);
}
</style>
