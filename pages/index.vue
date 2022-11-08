<script setup lang="ts">
import { Urgency } from "~~/types";

const { lang } = useLang();
const { data: frontpage, error: frontpageError } = await useFrontPage();
const muted = ref<boolean | undefined>(true);

const handleMute = () => {
  muted.value = !muted.value;
};

// TODO: Get this value from Strapi
const pinnedEvent = "ruumiantropoloogiad";

const dialogState = ref<boolean>(true);
// const { projects, firstUpcomingLiveEvent } = useProjects();

const event1 = computed(() => {
  return frontpage.value?.events?.length ? frontpage.value.events[0] : null;
});

// @TODO: Move this to processing level
const { urgency } = useDatetime(event1.value.start_at, event1.value.end_at);
const urgencyLabel = computed(() => {
  if (urgency.value === ("future" as Urgency)) {
    return ["tulemas", "tulemas"];
  } else if (urgency.value === ("soon" as Urgency)) {
    return ["soon", "varsti"];
  } else if (urgency.value === ("now" as Urgency)) {
    return ["live", "live"];
  } else {
    return ["new", "uus"];
  }
});

// const {
//   data: event,
//   formattedStartAtDistance,
//   urgency,
//   error,
// } = await useUpcomingEvent();

// TODO Add this filter to project/event loader
// const upcomingEventSoon = computed(() => {
//   if (
//     firstUpcomingLiveEvent?.value?.urgency === "soon" ||
//     firstUpcomingLiveEvent?.value?.urgency === "now"
//   ) {
//     return firstUpcomingLiveEvent.value;
//   } else {
//     return null;
//   }
// });

// const pinnedProject = computed(() => {
//   if (projects.value && pinnedEvent) {
//     return projects.value.find((project: any) => project.slug === pinnedEvent);
//   } else {
//     return null;
//   }
// });
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
        <EDialog
          v-if="dialogState && event1"
          :title="urgencyLabel[lang]"
          :dialog-state="dialogState"
          @close-dialog="dialogState = false"
        >
          <EventPreview :event="event1" :is-event="true" />
        </EDialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Page {
  position: relative;
}
.videoWrapper {
  /* TODO: Add global navbutton size variable for consistency */
  height: calc(var(--app-height, 100vh) - var(--h-9) * 2);
  overflow-y: auto;
  display: grid;
  place-content: center;
  overflow-y: auto;
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
  .videoWrapper {
    height: calc(var(--app-height, 100vh) - var(--h-9));
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

.EDialog {
  position: relative;
  overflow: hidden;
  background-color: var(--bg);
  width: 100%;
  max-width: 40rem;
}
</style>
