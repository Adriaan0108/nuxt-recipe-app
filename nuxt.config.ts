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
    domains: ["https://www.themealdb.com"],
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
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
  ],

  pwa: {
    manifest: {
      name: "Nuxt Recipe App",
      short_name: "Nuxt Recipes",
      description:
        "Nuxt Recipe Web App using TheMealDB recipe apis and Pinia store",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },

    // injectManifest: {
    //   globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    // },

    includeAssets: [
      "favicon.ico", // The favicon for the browser tab.
      "apple-touch-icon.png", // iOS home screen icon (required for iOS users).
      "mask-icon.svg", // Maskable icon for Android (for custom icon shapes). // need to manually create
      // "icons/icon-192x192.png", // Icon for Android and PWA installations (192x192).
      // "icons/icon-512x512.png", // Icon for Android and PWA installations (512x512).
    ],

    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/www\.themealdb\.com\/api\/json\/v1\/1\/.*$/i,
          // handler: 'NetworkFirst',
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100, // Cache up to 100 meals
              maxAgeSeconds: 86400, // 1 day
            },
          },
        },
      ],
    },

    registerType: "autoUpdate", // Updates service worker automatically

    devOptions: {
      enabled: true, // Enable PWA in development mode
      type: "module",
    },

    client: {
      installPrompt: true,
    },

    strategies: "generateSW", // Can also be 'injectManifest'
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  googleFonts: { families: { Montserrat: true } },
});
