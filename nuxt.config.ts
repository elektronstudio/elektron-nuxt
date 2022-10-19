// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icon"],
  runtimeConfig: {
    strapiUrl: "",
    public: { wsUrl: "", fientaUrl: "", fientaToken: "" },
  },
  experimental: { reactivityTransform: true },
});
