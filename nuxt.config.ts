// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-01",

  experimental: {
    scanPageMeta: "after-resolve",
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: "within",
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  features: {
    inlineStyles: true,
  },

  image: {
    domains: ["https://cdn.dummyjson.com", "https://www.themealdb.com"],
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],

  googleFonts: { families: { Montserrat: true } },
});
