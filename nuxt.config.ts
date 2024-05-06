// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icon", "@nuxtjs/i18n", "@nuxtjs/plausible"],
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-GB",
      },
      { code: "et", iso: "et-EE" },
    ],
    // TODO: Get from env.variables
    baseUrl: "https://elektron.art",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    customRoutes: "config",
    pages: {
      "schedule/index": {
        et: "/kava",
      },
      "schedule/past": {
        et: "/kava/toimunud",
      },
      "projects/index": {
        et: "/projektid",
      },
      "projects/[project_slug]/index": {
        et: "/projektid/[project_slug]",
      },
      "projects/[project_slug]/live": {
        et: "/projektid/[project_slug]/live",
      },
      "projects/[project_slug]/[event_slug]/index": {
        et: "/projektid/[project_slug]/[event_slug]",
      },
      "projects/[project_slug]/[event_slug]/live": {
        et: "/projektid/[project_slug]/[event_slug]/live",
      },
      "projects/[project_slug]/[event_slug]/experiment": {
        et: "/projektid/[project_slug]/[event_slug]/experiment",
      },
      "projects/memento/[event_slug]/experiment": {
        et: "/projektid/memento/[event_slug]/experiment",
      },
      "projects/memento/[event_slug]/live": {
        et: "/projektid/memento/[event_slug]/live",
      },
      "projects/other/seemsnormal/live": {
        et: "/projektid/other/seemsnormal/live",
      },
      "projects/ruumiantropoloogiad/index": {
        et: "/projektid/ruumiantropoloogiad",
      },
      "projects/ruumiantropoloogiad/kiss": {
        et: "/projektid/ruumiantropoloogiad/kiss",
      },
      "projects/ruumiantropoloogiad/layers": {
        et: "/projektid/ruumiantropoloogiad/layers",
      },
      "projects/ruumiantropoloogiad/walk": {
        et: "/projektid/ruumiantropoloogiad/walk",
      },
      "projects/ruumiantropoloogiad/aja-hambad/index": {
        et: "/projektid/ruumiantropoloogiad/aja-hambad",
      },
      "projects/ruumiantropoloogiad/aja-hambad/[blog_slug]": {
        et: "/projektid/ruumiantropoloogiad/aja-hambad/[blog_slug]",
      },
      "projects/ruumiantropoloogiad/kussaoled/index": {
        et: "/projektid/ruumiantropoloogiad/kussaoled",
      },
      "projects/ruumiantropoloogiad/kussaoled/live": {
        et: "/projektid/ruumiantropoloogiad/kussaoled/live",
      },
      about: {
        et: "/meist",
      },
      signal: {
        et: "/signal",
      },
    },
  },
  strapi: {
    version: "v4",
    prefix: "/api",
  },
  plausible: {
    // Prevent tracking on localhost
    ignoredHostnames: ["localhost"],
    domain: "elektron.art",
  },
  icon: {
    customCollections: [
      {
        prefix: "socials",
        dir: "./icons/socials",
      },
    ],
  },
  runtimeConfig: {
    strapiUrl: "",
    public: { wsUrl: "", fientaUrl: "", fientaToken: "" },
  },
  app: {
    // head: {
    //   script: [
    //     {
    //       src: "https://plausible.io/js/plausible.local.js",
    //       "data-domain": "elektron.art",
    //       defer: true,
    //     },
    //   ],
    // },
  },
  // experimental: { reactivityTransform: true },
});
