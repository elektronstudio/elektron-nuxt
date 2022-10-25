<template>
  <main class="Page Schedule"><slot /></main>
</template>
<style scoped>
.Page.Schedule {
  display: grid;
  grid-template-columns: 1fr;
  padding: var(--p-4);
  grid-gap: var(--gap-5);
}
.Page.Schedule aside {
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 1000px) {
  .Page.Schedule {
    grid-template-columns: 3fr 5fr;
  }
}
</style>
