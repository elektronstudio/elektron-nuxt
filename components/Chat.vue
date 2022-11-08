<script setup lang="ts">
type Props = {
  channel: string;
};

const { channel } = defineProps<Props>();
const { lang } = useLang();

const {
  chatMessages,
  newChatMessage,
  sendChatMessage,
  scrollable,
  textarea,
  newChatMessagesCount,
  scrollToBottom,
} = useChat(channel);

const { data: chatMessagesHistory } = await useChatHistory(channel);
const messages = computed(() => [
  ...(chatMessagesHistory.value || []),
  ...chatMessages.value,
]);
onMounted(() => {
  scrollToBottom();
});

const newMessagesString = computed(() => {
  if (newChatMessagesCount.value > 1) {
    return ["new messages", "uut sõnumit"][lang.value];
  } else {
    return ["new message", "uus sõnum"][lang.value];
  }
});
</script>

<template>
  <div class="EChat">
    <div class="messagesWrapper">
      <div class="messages" ref="scrollable">
        <template v-for="message in messages">
          <div v-if="message.value" class="message">
            <p v-if="message.username" class="username">
              {{ message.username }}
            </p>
            <p>{{ message.value }}</p>
          </div>
        </template>
      </div>
      <EButton
        class="newMessages"
        v-if="newChatMessagesCount > 0"
        size="xs"
        color="accent"
        @click="scrollToBottom()"
      >
        {{ newChatMessagesCount }} {{ newMessagesString }}
      </EButton>
    </div>
    <div class="messageBox">
      <textarea
        class="chatTextarea"
        v-model="newChatMessage"
        ref="textarea"
        resize="none"
      />
      <EButton size="xs" color="accent" @click="sendChatMessage">
        Saada
      </EButton>
    </div>
  </div>
</template>

<style scoped>
.EChat {
  display: flex;
  flex-direction: column;
  padding: var(--p-2);
  background-color: var(--bg);
  /* TODO: Is this too much? */
  width: 100%;
  height: 100%;
}

.messagesWrapper {
  flex-grow: 1;
  position: relative;
}
.messages {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
}

.message {
  padding: var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.username {
  color: var(--gray-400);
}

/* TODO: add admin message class modifier */
/* .message:nth-child(4) {
  background-color: var(--accent);
}
.message:nth-child(4) p {
  color: var(--bg);
} */
.messageBox {
  flex-shrink: 0;
  margin-bottom: 0;
  /* height: 2rem; */
  display: flex;
  align-items: flex-end;
}

.chatTextarea {
  flex-grow: 1;
  margin-right: var(--p-2);
  background-color: var(--bg);
  padding: 0 var(--p-3);
  resize: none;
  height: 1.6rem;
  border: 1px solid var(--gray-300);
  width: 100%;
}

.chatTextarea:focus {
  outline: none;
  border-color: var(--fg);
}
.chatTextarea:not(:disabled):hover {
  background-color: rgba(250, 250, 250, 0.1);
}

.newMessages {
  position: absolute;
  bottom: var(--p-2);
  left: 50%;
  transform: translateX(-50%);
}
</style>
