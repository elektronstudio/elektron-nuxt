<template>
  <main class="main">
    <Nav />
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
}
</style>
