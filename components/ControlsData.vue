<script setup lang="ts">
type Props = {
  messages: any[];
  controls?: any[];
  wide?: boolean;
};
const props = defineProps<Props>();
const wide = props.wide || false;

const currentXTime = inject("currentXTime", ref(null));
provide("currentXTime", currentXTime);

const controlsData = useControlsData(
  toRef(props, "messages"),
  toRef(props, "controls"),
);
const username = ref(null);

const formatControlData = (d) => ({
  Type: d.type,
  "Min value": d.yDataMin,
  "Max value": d.yDataMax,
  "Graph start": formatDatetimePrecise(d.xMin),
  "Data start": formatDatetimePrecise(d.xDataMin),
  "Data end": formatDatetimePrecise(d.xDataMax),
  "Graph end": formatDatetimePrecise(d.xMax),
  "Current time": currentXTime ? formatDatetimePrecise(currentXTime.value) : "",
});
</script>

<template>
  <EStack class="wrapper">
    <EStack v-for="d in controlsData" style="gap: var(--p-4)">
      <ETitle size="sm">{{ d.control?.title || d.type }}</ETitle>
      <Data :data="formatControlData(d)" />
      <ControlsGraph :data="d" :username="username" />
      <div :class="wide ? 'flex justify-between' : ''">
        <div :class="wide ? 'flex flex-wrap gap-4' : ''">
          <button
            v-for="user in d.users.filter((u) => u.username)"
            @click="d.users.length > 1 ? (username = user.username) : null"
            class="userButton"
            :style="{
              opacity: !username || user.username === username ? '1' : '0.3',
            }"
          >
            <Icon
              name="ph:circle-fill"
              class="h-3 w-3"
              :style="{
                color: user.color,
              }"
            />
            {{ user.username }}
          </button>
        </div>
        <EButton
          size="xs"
          @click="username = null"
          :style="{ opacity: username ? '0.5' : '0' }"
        >
          Show all users
        </EButton>
      </div>
    </EStack>
  </EStack>
</template>

<style scoped>
.wrapper {
  gap: var(--p-4);
  padding: var(--p-3);
}

.wrapper > div {
  width: 100%;
}
.userButton {
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}
</style>
