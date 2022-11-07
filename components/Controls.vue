<script setup lang="ts">
import { debouncedWatch } from "@vueuse/core";

type Props = {
  controls: any;
};
const { controls: defaultControls } = defineProps<Props>();
const { lang } = useLang();
const { sendMessage } = useMessages();
// const userId = useUserId();
// const userName = useUserName();

const controls = ref([]);

watch(
  () => defaultControls,
  () => (controls.value = defaultControls),
  { immediate: true },
);

debouncedWatch(
  () => controls.value.map((c) => c.value),
  (controlsValues, prevControlsValues) => {
    controlsValues.forEach((controlsValue, i) => {
      if (controlsValue !== prevControlsValues[i]) {
        const c = controls.value[i];
        if (c.control === "slider") {
          const message = {
            channel: c.channel,
            type: c.type,
            value: controlsValue,
            userid: userId.value,
            username: userName.value,
          };
          sendMessage.value(message);
        }
        if (c.control === "button") {
          console.log("button", c, controlsValue);
          if (controlsValue !== 0) {
            sendMessage.value({
              channel: c.channel,
              type: c.type,
              value: 10,
              userid: userId.value,
              username: userName.value,
            });
            c.value = 0;
            sendMessage.value({
              channel: c.channel,
              type: c.type,
              value: 0,
              userid: userId.value,
              username: userName.value,
            });
          }
        }
      }
    });
  },
  { deep: true, debounce: 200 },
);
</script>

<template>
  <div class="Controls">
    <div v-for="(c, i) in controls" :key="i">
      <ETitle size="sm" v-if="c.title">{{ c.title }}</ETitle>
      <template v-if="c.control === 'slider'">
        <EFormRange
          :label="c.description"
          v-model="c.value"
          :min="c.min"
          :max="c.max"
          :step="c.step"
        />

        <div v-if="c.labels" class="labels">
          <div v-for="label in c.labels" :key="label">
            {{ label }}
          </div>
        </div>
      </template>
      <ETextArea v-if="c.control === 'text'" v-model="c.value" />
      <EButton
        v-if="c.control === 'button'"
        color="accent"
        size="xs"
        @click="c.value = 10"
      >
        {{ c.label }}
      </EButton>
    </div>
  </div>
</template>

<style scoped>
.Controls {
  padding: var(--p-4);
}
.labels {
  display: flex;
  justify-content: space-between;
}
.ETitle {
  margin-bottom: var(--m-2);
}
</style>
