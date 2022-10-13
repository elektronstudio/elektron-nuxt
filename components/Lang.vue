<script setup lang="ts">
// TODO: Find better UI / place for language switcher

import { watchEffect } from "vue";
import { useMagicKeys } from "@vueuse/core";
const { changeLang, lang } = useLang()

const { shift, l: lKey } = useMagicKeys();

watchEffect(() => {
  if (shift.value && lKey.value) {
    changeLang();
  }
});
</script>

<template>
  <button @click="changeLang()">
    {{ ["EST", "ENG"][lang] }}
  </button>
</template>

<style scoped>
.Lang {
  position: fixed;
  bottom: var(--p-1);
  left: var(--p-1);
}
</style>
