// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icon", "@nuxtjs/i18n", "@nuxtjs/plausible"],
  i18n: {
    locales: ["en", "et"],
    strategy: "prefix_except_default",
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
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
