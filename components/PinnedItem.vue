<template>
  <div class="ELivePreview">
    <slot />
  </div>
</template>
<style scoped>
.ELivePreview {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.ELivePreview :deep(aside) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--p-3);
  color: var(--gray-300);
}
.ELivePreview :deep(.EStack) {
  margin-bottom: var(--m-4);
}
.ELivePreview :deep(aside header a) {
  color: var(--fg);
}
.ELivePreview :deep(aside header p span) {
  color: var(--gray-300);
  width: 42%;
  display: inline-block;
}
.ELivePreview :deep(aside footer) {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: var(--gap-1);
}
.ELivePreview :deep(img) {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

@media only screen and (min-width: 600px) {
  .ELivePreview {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .ELivePreview :deep(img) {
    aspect-ratio: 1;
  }
}
</style>
