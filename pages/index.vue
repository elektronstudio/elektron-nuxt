<script setup lang="ts">
import _, { findIndex } from "lodash";
const { lang } = useLang();
const { data: frontpage, error: frontpageError } = await useFrontPage();
const muted = ref<boolean | undefined>(true);
breadcrumbs.value = [];

const handleMute = () => {
  muted.value = !muted.value;
};

const dialogState = ref<boolean>(true);

const events = frontpage.value.events;
const projects = frontpage.value.projects;
const pinnedItems = ref([
  ...events?.map((e: any) => ({ ...e, isEvent: true })),
  ...projects?.map((p: any) => ({ ...p, isProject: true })),
]);
const pinnedItemsIds = ref(pinnedItems.value.map((item) => item.id));
console.log([...pinnedItemsIds.value]);
console.log(findIndex(pinnedItemsIds.value, 68));

const event = computed(() => {
  console.log(frontpage.value?.events);
  return frontpage.value?.events?.length ? frontpage.value.events[0] : null;
});

const project = computed(() => {
  return frontpage.value?.projects?.length ? frontpage.value.projects[0] : null;
});

function moveToLast(id: string) {
  _.pull(pinnedItemsIds.value, id); // Removes all occurrences of the item
  pinnedItemsIds.value.push(id); // Adds the item to the end of the array
  // pinnedItems.value = _.shuffle(pinnedItems.value);
}

function closeDialog(index: number) {
  pinnedItemsIds.value.splice(index, 1);
}
</script>
<template>
  <div>
    <ErrorCard v-if="frontpageError" />
    <div v-else class="Page">
      <div class="videoWrapper" :class="{ dialogActive: dialogState }">
        <Transition>
          <ETitle v-if="!dialogState" size="lg" class="about">
            <div v-html="frontpage?.descriptions[lang]" />
          </ETitle>
        </Transition>
        <video
          v-if="frontpage"
          class="video"
          :src="frontpage.background.url"
          :muted="muted"
          autoplay
          playsinline
          webkit-playsinline
          preload="auto"
          loop
        />
        <Transition>
          <button
            v-if="!dialogState"
            class="muteButton"
            @click="() => handleMute()"
          >
            <Icon name="radix-icons:speaker-off" v-if="muted" />
            <Icon name="radix-icons:speaker-loud" v-else />
          </button>
        </Transition>
      </div>
      <div class="pinnedItems" :data-ids="[...pinnedItemsIds]">
        <EDialog
          v-if="dialogState && pinnedItems.length > 0"
          v-for="(item, index) in pinnedItems"
          :title="
            event?.urgencyLabel
              ? event.urgencyLabel[lang]
              : `${$t('pinned')}: ${item.title}`
          "
          :key="item.id"
          :dialog-state="dialogState"
          @click="moveToLast(item.id)"
          @close-dialog="closeDialog(index)"
          :class="`order-${pinnedItemsIds.findIndex((id) => id === item.id)}`"
        >
          <EventPreview v-if="item.isEvent" :event="item" />
          <ProjectPreview v-if="item.isProject" :project="item" />
        </EDialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Page {
  position: relative;
}
.videoWrapper,
.pinnedItems {
  position: fixed;
  top: var(--h-9);
  width: 100%;
  left: 0;
  height: calc(100dvh - var(--h-9));
  overflow-y: auto;
  display: grid;
  place-content: center;
  padding: var(--p-3);
}
.videoWrapper.dialogActive > *:not(.EDialog) {
  filter: blur(8px);
  opacity: 0.6;
}
.about {
  position: absolute;
  top: 0;
  left: 0;
  /* TODO: Add global gutter variables system for consistency */
  padding: var(--p-3);
  z-index: 1;
  color: var(--gray-300);
  /* mix-blend-mode: difference; */
}
@media only screen and (min-width: 600px) {
  .about {
    width: 50vw;
  }
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  touch-action: none;
}

.muteButton {
  position: absolute;
  left: var(--p-3);
  bottom: var(--p-3);
}

@media only screen and (min-width: 600px) {
  .about {
    padding: var(--p-5);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.pinnedItems {
}

.EDialog {
  position: absolute;
  overflow: hidden;
  background-color: var(--bg);
  width: 100%;
  max-width: 40rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: all 0.3s ease-in-out;

  &.order-1 {
    transform: translate(-50%, calc(-50% + var(--p-6)));
    z-index: 2;
  }

  &.order-2 {
    transform: translate(-50%, calc(-50% + var(--p-12)));
    z-index: 3;
  }

  &.order-3 {
    transform: translate(-50%, calc(-50% + var(--p-18)));
    z-index: 4;
  }
}

@media only screen and (min-width: 600px) {
  .EDialog {
    &.order-1 {
      transform: translate(calc(-50% + var(--p-6)), calc(-50% + var(--p-6)));
    }

    &.order-2 {
      transform: translate(calc(-50% + var(--p-12)), calc(-50% + var(--p-12)));
    }

    &.order-3 {
      transform: translate(calc(-50% + var(--p-18)), calc(-50% + var(--p-18)));
    }
  }
}

.items-move {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
