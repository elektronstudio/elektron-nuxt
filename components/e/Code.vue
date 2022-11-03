<template>
  <pre class="ECode"><slot /></pre>
</template>

<style scoped>
.ECode {
  white-space: pre-wrap;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--gray-400);
  padding: var(--p-2);
  background-color: var(--gray-700);
}
</style>
