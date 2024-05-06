<script setup lang="ts">
const route: any = useRoute();
const { isLive } = route.meta;
</script>

<template>
  <footer v-if="!$route.fullPath.endsWith('/live') && !isLive" class="footer">
    <div class="info">
      <p>elektron.art, Kopli 27 Tallinn.</p>
      <a href="mailto:kaos@elektron.art">kaos@elektron.art</a>
    </div>

    <nav class="socials">
      <a
        href="https://www.instagram.com/elektron.art/"
        target="_blank"
        rel="noopener"
      >
        <Icon name="fa6-brands:square-instagram" />
      </a>
      <a
        href="https://www.facebook.com/elektron.art"
        target="_blank"
        rel="noopener"
      >
        <Icon name="fa6-brands:square-facebook" />
      </a>
      <a href="https://x.com/ElektronArt" target="_blank" rel="noopener">
        <Icon name="fa6-brands:square-x-twitter" />
      </a>
      <a
        href="https://www.linkedin.com/company/elektron-art"
        target="_blank"
        rel="noopener"
      >
        <Icon name="fa6-brands:linkedin" />
      </a>
      <a
        href="https://podcasts.apple.com/us/podcast/elektron-signal/id1589223989"
        target="_blank"
        rel="noopener"
      >
        <Icon name="socials:apple-podcasts" />
      </a>
      <a
        href="https://open.spotify.com/show/6rUHg2PhqSXXykMepO41wK"
        target="_blank"
        rel="noopener"
      >
        <Icon name="fa6-brands:spotify" />
      </a>
    </nav>
  </footer>
</template>

<style>
.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* align-items: center; */
  margin-top: auto;
  padding: var(--p-1) var(--p-3);
  height: var(--h-20);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  color: var(--gray-300);
  border-top: var(--border-DEFAULT) solid var(--gray-500);
  z-index: 10;
  background-color: var(--bg);
}

.info {
  display: flex;
  gap: 2rem;
}

.socials {
  display: flex;
  gap: 1rem;
}

.socials span {
  font-size: 1.2em;
}

@media only screen and (min-width: 600px) {
  .footer {
    height: var(--h-9);
    padding: var(--p-1);
    flex-direction: row;
    justify-content: space-between;
    padding: var(--p-1) var(--p-3);
  }
}
</style>
