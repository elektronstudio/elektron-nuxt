<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
const { locale, setLocale, t } = useI18n();

const route: any = useRoute();
const navItems = [
  {
    label: t("schedule"),
    path: "/schedule",
  },
  {
    label: t("projects"),
    path: "/projects",
  },
  {
    label: t("about"),
    path: "/about",
  },
  {
    label: t("podcast"),
    path: "/signal",
  },
];

const { theme, changeTheme } = useTheme();
const navState = ref(false);
const { isLive } = route.meta;

const keys = useMagicKeys();
const shiftL = keys["Shift+l"];
watch(shiftL, (v) => {
  if (v) {
    setLocale(locale.value === "en" ? "et" : "en");
  }
});
</script>

<template>
  <Transition appear>
    <header v-if="!$route.fullPath.endsWith('/live') && !isLive" class="Nav">
      <NuxtLinkLocale
        to="/"
        class="menuItem homeButton"
        @click="navState = false"
      >
        <ELogo el="span" />
      </NuxtLinkLocale>
      <nav class="menu" :class="{ navActive: navState }">
        <NuxtLinkLocale
          class="menuItem"
          to="schedule"
          @click="navState = false"
        >
          {{ $t("schedule") }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          class="menuItem"
          to="projects"
          @click="navState = false"
        >
          {{ $t("projects") }}
        </NuxtLinkLocale>
        <NuxtLinkLocale class="menuItem" to="about" @click="navState = false">
          {{ $t("about") }}
        </NuxtLinkLocale>
        <NuxtLinkLocale class="menuItem" to="signal" @click="navState = false">
          {{ $t("podcast") }}
        </NuxtLinkLocale>

        <a href="https://lab.elektron.art" class="menuItem">
          <Icon name="radix-icons:external-link" />
          Lab
        </a>
        <!-- TODO: Consider using client-side mediaQuery component -->
        <Lang class="menuItem languageSwitcher largeScreen" />
      </nav>
      <span class="menuItem spacer"></span>
      <Lang class="menuItem languageSwitcher smallScreen" />
      <!-- TODO: theme switcher  -->
      <!-- <button
        class="menuItem themeSwitcher"
        @click="
          () => {
            changeTheme();
            navState = false;
          }
        "
      /> -->
      <NavLive class="menuItem" />
      <button class="toggleNav" @click="navState = !navState">
        <Icon name="radix-icons:hamburger-menu" />
      </button>
    </header>
  </Transition>
</template>

<style scoped>
.Nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100; /* Changed from 100 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg);
  transform: none;
}

.menu {
  display: none;
  flex-direction: column;
  background-color: var(--bg);
}
.menuItem {
  display: inline-flex;
  /* justify-content: space-between; */
  gap: 0.4em;
  height: var(--h-9);
  padding: var(--p-1) var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  color: var(--gray-300);
  border: var(--border-DEFAULT) solid var(--gray-500);
}
.menuItem svg {
  width: 1em;
  height: 1em;
}
.languageSwitcher {
  margin-left: auto;
  width: 4rem;
  max-width: 4rem;
}
.languageSwitcher.smallScreen {
  margin-right: calc(var(--border-DEFAULT) * -1);
}
.languageSwitcher.largeScreen {
  display: none;
}
.homeButton {
  display: inline-block;
  color: var(--gray-300);
  padding: var(--p-1) var(--p-3);
  border: var(--border-DEFAULT) solid var(--gray-500);
}
.toggleNav {
  display: grid;
  place-content: center;
  padding: var(--p-3);
  height: var(--h-9);
  border: var(--border-DEFAULT) solid var(--gray-500);
}
.toggleNav svg {
  color: var(--gray-300);
  width: var(--w-7);
  height: var(--h-7);
}

.spacer {
  flex-grow: 1;
  margin-left: calc(var(--border-DEFAULT) * -1);
  pointer-events: none;
}

.themeSwitcher {
  width: 1.4rem;
  background-color: var(--fg);
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .menu.navActive {
    display: flex;
  }
  .Nav {
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 999px) {
  .menu.navActive {
    display: grid;
    position: fixed;
    top: var(--h-9);
    width: 100%;
    margin-top: calc(var(--border-DEFAULT) * -1);
    z-index: 100;
  }
  .Nav > *:not(:first-child, .menu) {
    margin-right: calc(var(--border-DEFAULT) * -1);
  }

  .menu > .menuItem:not(:first-child) {
    margin-top: calc(var(--border-DEFAULT) * -1);
  }
  .menu > .menuItem {
    border-bottom: var(--border-DEFAULT) solid var(--gray-500);
  }
}
@media only screen and (min-width: 600px) {
  .homeButton {
    min-width: 10rem;
  }
  .menuItem {
    padding: var(--p-1);
  }
  .toggleNav:hover,
  .menuItem.router-link-active,
  .menuItem:hover {
    border-image: url("/images/bg-texture-xs.gif") 1;
    z-index: 2;
  }
  .languageSwitcher {
    margin-right: 0;
  }
}
@media only screen and (min-width: 1000px) {
  .Nav {
    display: flex;
    transform: translateY(0);
    border-bottom: none;
    transition: transform 0.2s ease;
  }
  .menu {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
  .menu > .menuItem {
    flex-shrink: 0;
    flex-grow: 1;
  }
  .menu > .menuItem:not(:first-child) {
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
  .languageSwitcher {
    margin-left: calc(var(--border-DEFAULT) * -1);
    margin-right: 0;
    /* width: auto; */
  }
  .homeButton {
    min-width: 10rem;
    margin-left: calc(var(--border-DEFAULT) * -1);
    border: var(--border-DEFAULT) solid var(--gray-500);
  }
  .toggleNav {
    display: none;
  }
  .languageSwitcher.smallScreen {
    display: none;
  }
  .languageSwitcher.largeScreen {
    display: inline-flex;
  }
  .spacer {
    display: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>
