// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icon", "@nuxtjs/plausible"],
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
