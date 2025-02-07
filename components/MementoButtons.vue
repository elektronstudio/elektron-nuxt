<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";

type Props = {
  initialControls: string;
};

const { initialControls } = defineProps<Props>();
const { sendMessage, messages, ws } = useMessages();

const buttonUpdates = computed(() => {
  return messages.value.filter(
    (m) => m.type === "UPDATE_BUTTON" && m.channel === "experiment",
  );
});

const question = computed(() => {
  const q = messages.value.filter(
    (m) => m.type === "UPDATE_QUESTION" && m.channel === "experiment",
  );
  const latestQuestion = q.pop();
  if (
    latestQuestion &&
    latestQuestion.value !== "" &&
    latestQuestion.value !== "null" &&
    latestQuestion.value !== "0"
  ) {
    return latestQuestion.value;
  } else {
    return null;
  }
});

const buttons = ref<
  { type: string; label: string; color: string; channel: string }[]
>(parseControls(initialControls) || []);

watch(buttonUpdates, () => {
  const updatedButtonData = buttonUpdates.value.pop()?.value.split(" ");
  const updatedButton = updatedButtonData
    ? {
        index: Number(updatedButtonData[0]),
        label: updatedButtonData[1].replace(/'/g, " "),
        color: updatedButtonData[2],
      }
    : undefined;

  buttons.value =
    buttons.value?.map((button, index) => {
      if (updatedButton && index === updatedButton.index) {
        return {
          ...button,
          label: updatedButton.label,
          color: updatedButton.color,
        };
      }
      return button;
    }) || [];
});

const buttonNumbers = ref<Array<number | undefined>>([
  undefined,
  undefined,
  undefined,
]);

watch(messages.value, () => {
  const latestMessage = messages.value[messages.value.length - 1];
  if (latestMessage.type === "UPDATE_BUTTON_NR") {
    const latestMessageValue = latestMessage.value.split(" ");
    buttonNumbers.value.splice(
      Number(latestMessageValue[0]),
      1,
      Number(latestMessageValue[1]),
    );
  }
});

const handleClick = useThrottleFn((channel: string, type: string) => {
  sendMessage.value({
    channel,
    type,
    value: 10,
    userid: userId.value,
    username: userName.value,
  });
  sendMessage.value({
    channel,
    type,
    value: 0,
    userid: userId.value,
    username: userName.value,
  });
}, 3000);

function isEmoji(string: string) {
  // Regex pattern to match emoji characters
  const emojiPattern =
    /[\u{1F000}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}\u{200D}]/u;

  return emojiPattern.test(string);
}

function handleDebug() {
  sendMessage.value({
    channel: "experiment",
    type: "UPDATE_BUTTON_NR",
    value: "2 212",
    userid: userId.value,
    username: userName.value,
    store: false,
  });
}
</script>

<template>
  <div class="wrapper">
    <h4 v-if="question">{{ question }}</h4>
    <div class="MementoButtons">
      <button
        v-if="buttons"
        v-for="(control, index) in buttons"
        class="MementoButton"
        :class="{ ['m-text']: !isEmoji(control.label) }"
        @click="handleClick(control.channel, control.type)"
        :style="{ backgroundColor: control.color }"
      >
        <svg v-if="isEmoji(control.label)">
          <text
            x="50%"
            y="50%"
            dominant-baseline="central"
            text-anchor="middle"
          >
            {{ control.label }}
          </text>
        </svg>
        <span v-else-if="control.label !== 'null'" class="button-text">{{
          control.label
        }}</span>
        <span v-if="buttonNumbers[index]" class="button-nr">
          {{ buttonNumbers[index] }}
        </span>
      </button>
    </div>
    <!-- <button @click="handleDebug">DEBUG</button> -->
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: var(--p-5);
  gap: var(--p-5);
}
.MementoButtons {
  display: flex;
  gap: var(--p-5);
  justify-content: space-between;
  /* flex-wrap: wrap; */
}
.MementoButton {
  position: relative;
  background-color: var(--accent);
  border-radius: var(--rounded-DEFAULT);
  width: 30%;
  aspect-ratio: 1 / 1;
}
.MementoButton.m-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

.button-text {
  text-align: center;
  color: black;
  font-family: var(--font-mono);
  text-transform: uppercase;
  /* font-size: var(--text-xs); */
  line-height: 1.1;
}
.button-nr {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  font-size: 0.8rem;
  color: black;
  font-family: var(--font-mono);

  text-transform: uppercase;
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
