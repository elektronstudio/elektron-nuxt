<template>
  <div class="PinnedItem">
    <slot />
  </div>
</template>
<style scoped>
.PinnedItem {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.PinnedItem :deep(aside) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--p-3);
  color: var(--gray-300);
}
.PinnedItem :deep(.EStack) {
  margin-bottom: var(--m-4);
}
.PinnedItem :deep(aside header a) {
  color: var(--fg);
}
.PinnedItem :deep(aside header p span) {
  color: var(--gray-300);
  width: 42%;
  display: inline-block;
}
.PinnedItem :deep(aside footer) {
  display: flex;
  gap: var(--gap-2);
  flex-wrap: wrap;
}
.PinnedItem :deep(aside footer .eventButtons) {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: var(--gap-1);
}
.PinnedItem :deep(img) {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

@media only screen and (min-width: 600px) {
  .PinnedItem {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .PinnedItem :deep(img) {
    aspect-ratio: 1;
  }
}
</style>
