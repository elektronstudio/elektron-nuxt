<script setup lang="ts">
import { userName, userMessage } from "~~/composables/user";
const { lang } = useLang();
// const userName = useUserName();
// const userMessage = useUserMessage();
// const draggableChatState = useDraggableChatState();

const handleClose = () => {
  draggableChatState.value = false;
};

const handleToggle = () => {
  draggableChatState.value = !draggableChatState.value;
};
</script>

<template>
  <Transition name="dialog">
    <EDialog
      v-if="draggableChatState"
      class="UserInfo"
      :title="$t('chat')"
      :dialog-state="draggableChatState"
      @close-dialog="handleClose"
    >
      <p style="font-size: 0.8em">Your name</p>
      <EInput v-model="userName" />
      <p style="font-size: 0.8em; margin-top: 0.5em">Your message</p>
      <EInput v-model="userMessage" />
    </EDialog>
  </Transition>
  <EDraggableTitlebar :title="userName" class="userTab" @click="handleToggle">
    <span class="userIndicator" />
  </EDraggableTitlebar>
</template>

<style scoped>
.UserInfo {
  position: fixed;
  bottom: var(--gap-7);
  right: var(--gap-2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  transform: scale(1);
  transform-origin: bottom right;
}
.UserInfo :deep(article) {
  padding: var(--p-4);
}
.UserInfo :deep(.EInput) {
  margin-bottom: 0;
}
.EDraggableTitlebar.userTab {
  position: fixed;
  bottom: 0;
  width: var(--dock-item-size);
  right: var(--gap-3);
  z-index: 1000;
  border: 1px solid var(--gray-500);
  border-bottom: 0;
  transform: 0;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.userIndicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--gap-1);
  display: block;
  width: var(--w-4);
  height: var(--h-4);
  border-radius: var(--rounded-full);
  background-color: var(--accent);
}
.dialog-enter-active,
.dialog-leave-active {
  transition: 0.4s ease-in-out;
  border: 1px solid var(--gray-500);
}

.dialog-enter-from,
.dialog-leave-to {
  transform: scale(0);
}

.dialog-enter-active :deep(*),
.dialog-leave-active :deep(*) {
  opacity: 0;
}

@media only screen and (min-width: 900px) {
  /* .idle .EDraggableTitlebar.userTab {
    transform: translateY(100%);
  } */
}
</style>
