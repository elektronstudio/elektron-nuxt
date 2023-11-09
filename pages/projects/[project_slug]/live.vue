<script setup lang="ts">
import type { Urgency } from "~~/types";

const route = useRoute();
const slug = route.params.project_slug as string;
const { lang } = useLang();
const { data: project, error } = await useProjectBySlug(slug as string);
breadcrumbs.value = [];
useHead({
  title: `${project.value.title} – elektron.art`,
});

const draggables = useDraggables({
  video: {
    titles: ["Stream", "Stream"],
    contentType: "video",
    initialX: 0,
    initialY: 1,
    tilesWidth: 15,
    maximisable: true,
    hideTitleBarOnIdle: true,
  },
  chat: {
    contentType: "chat",
    initialX: 16,
    initialY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
  },
  about: {
    tilesWidth: 8,
    tilesHeight: 4,
    initialX: 1,
    initialY: 6,
  },
  controls: {
    tilesWidth: 4,
    tilesHeight: 2,
    initialX: 10,
    initialY: 6,
  },
});

const hasTicket = ref<boolean>(false);

// @TODO: Move this to processing level
const { urgency } = useDatetime(project.value.start_at, project.value.end_at);
const urgencyLabel = computed(() => {
  if (urgency.value === ("future" as Urgency)) {
    return ["upcoming", "tulemas"];
  } else if (urgency.value === ("soon" as Urgency)) {
    return ["soon", "varsti"];
  } else if (urgency.value === ("now" as Urgency)) {
    return ["live", "live"];
  } else {
    return ["new", "uus"];
  }
});

const noTicketDraggables = useDraggables({
  preview: {
    titles: urgencyLabel.value,
    initialX: 6,
    initialY: 2,
    tilesWidth: 8,
    // tilesHeight: 5,
  },
});
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  const fientaValidate = getTicketableStatus([project.value]);

  if (fientaValidate.status !== "REQUIRES_TICKET") {
    hasTicket.value = true;
  }
});
</script>

<template>
  <div>
    <BackToEvent :link="project.projectLink" />
    <EBreadBoard v-if="!hasTicket">
      <DraggableHoc v-bind="noTicketDraggables.preview">
        <ProjectPreview :project="project" />
      </DraggableHoc>
      <DraggablesDock :draggables="noTicketDraggables" />
    </EBreadBoard>
    <EBreadBoard v-else>
      <DraggableHoc v-bind="draggables.video" v-if="project.vimeoId">
        <VimeoIframe v-if="project.vimeoId" :id="project.vimeoId" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.chat">
        <Chat :channel="slug" />
      </DraggableHoc>
      <DraggableHoc v-bind="draggables.about">
        <EStack style="padding: var(--p-5)">
          <ETitle size="lg">{{ project.title }}</ETitle>
          <EContent
            :content="project.live_contents[lang] || project.description"
          />
        </EStack>
      </DraggableHoc>

      <DraggablesDock :draggables="draggables" />
    </EBreadBoard>
  </div>
</template>
