<template>
  <main
    class="main"
    :class="{ indexPage: $route.fullPath === '/', isLive: isLive }"
  >
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
  padding-top: var(--h-9);
}

.main.isLive {
  padding-top: calc(var(--h-9) * 2);
}

@media only screen and (min-width: 600px) {
  .main.isLive,
  .main {
    padding-top: calc(var(--h-9) + var(--h-6));
  }
}
</style>
