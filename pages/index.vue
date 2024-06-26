<script setup lang="ts">
const { lang } = useLang();
const { data: frontpage, error: frontpageError } = await useFrontPage();
const muted = ref<boolean | undefined>(true);
breadcrumbs.value = [];

const handleMute = () => {
  muted.value = !muted.value;
};

const dialogState = ref<boolean>(true);

const event = computed(() => {
  return frontpage.value?.events?.length ? frontpage.value.events[0] : null;
});

const project = computed(() => {
  return frontpage.value?.projects?.length ? frontpage.value.projects[0] : null;
});
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
          v-if="dialogState && (event || project)"
          :title="event?.urgencyLabel ? event.urgencyLabel[lang] : $t('pinned')"
          :dialog-state="dialogState"
          @close-dialog="dialogState = false"
        >
          <EventPreview v-if="event" :event="event" />
          <ProjectPreview v-else-if="project" :project="project" />
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

.EDialog {
  position: relative;
  overflow: hidden;
  background-color: var(--bg);
  width: 100%;
  max-width: 40rem;
}
</style>
