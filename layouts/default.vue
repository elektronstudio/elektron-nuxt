<template>
  <main class="main">
    <Nav />
    <Breadcrumbs />
    <slot />
    <UserInfo />
    <EWindowBorder />
    <DraggableChat />
  </main>
</template>

<style scoped>
.main {
  /* position: relative; */
  display: flex;
  min-height: 100vh;
  height: 100vh;
  flex-direction: column;
  padding-top: calc(var(--h-9) + var(--h-6));
}
</style>
