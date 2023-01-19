<script lang="ts" setup>
type Props = {
  initialControls: string;
};

const { initialControls } = defineProps<Props>();
const { sendMessage, messages } = useMessages();
const commands = computed(() => {
  return messages.value.filter(
    (m) => m.type === "COMMAND" && m.channel === "experiment",
  );
});
const controls = computed(() => {
  return parseControls(
    messages.value.length > 0
      ? messages.value[messages.value.length - 1].value
      : initialControls,
  );
});
const handleClick = (channel: string, type: string) => {
  sendMessage.value({
    channel: channel,
    type: type,
    value: 10,
    userid: userId.value,
    username: userName.value,
  });
  sendMessage.value({
    channel: channel,
    type: type,
    value: 0,
    userid: userId.value,
    username: userName.value,
  });
};
</script>

<template>
  <div class="MementoButtons">
    <button
      v-if="controls"
      v-for="control in controls"
      className="MementoButton"
      @click="handleClick(control.channel, control.type)"
    >
      <svg>
        <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">
          {{ control.label }}
        </text>
      </svg>
    </button>
  </div>
</template>

<style>
.MementoButtons {
  display: flex;
  /* gap: var(--p-5); */
  justify-content: space-between;
  padding: var(--p-5);
  flex-wrap: wrap;
}
.MementoButton {
  position: relative;
  background-color: var(--accent);
  border-radius: var(--rounded-DEFAULT);
  width: 30%;
  aspect-ratio: 1 / 1;
}
.MementoButton svg {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  width: 100%;
  height: 100%;
}
.MementoButton svg text {
  font-size: 10vw;
}
.MementoButton:hover {
  filter: brightness(0.8);
}
@media only screen and (min-width: 600px) {
  .MementoButton svg text {
    font-size: 2.6vw;
  }
}
</style>
