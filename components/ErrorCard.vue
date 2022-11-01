<template>
  <div class="ErrorCard">
    <div class="planets">
      <Icon name="radix-icons:globe" /><Icon name="radix-icons:globe" />
    </div>
    <br />
    <p>
      The planets are not aligned to display this page. You are either offline,
      our servers are down, or there is a hyperspace bypass being built.
    </p>
  </div>
</template>

<style scoped>
.ErrorCard {
  display: grid;
  height: 100%;
  place-content: center;
  place-items: center;
  padding: var(--p-8);
  text-align: center;
}
.ErrorCard p {
  max-width: 40ch;
}

.planets {
  margin-bottom: 1rem;
}
.planets svg {
  width: 1.4rem;
  height: 1.4rem;
}
.planets > *:nth-child(2) {
  transform: translateY(-5px);
}
</style>
