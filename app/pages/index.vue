<script setup lang="ts">
import { type RecipeResponse } from "../../types/types";

definePageMeta({ layout: "home" }); // default layout will be used if not specified here

// const { data, error } = useAsyncData("recipes", () =>
//   $fetch("https://dummyjson.com/recipes?limit=12")
// ); // alternative

// const { data, error } = await useFetch<RecipeResponse>(
//   "https://dummyjson.com/recipes?limit=12"
// );

const { data, error } = await useFetch<RecipeResponse>(
  "https://dummyjson.com/recipes"
);

useSeoMeta({
  title: "Nuxtcipes",
  description: "Recipes to try!",
  ogTitle: "Nuxtcipes",
  ogDescription: "Recipes to try!",
  ogImage: "/nuxt-course-hero.png",
  ogUrl: `http:localhost:3000`,
  twitterTitle: "Nuxtcipes",
  twitterDescription: "Recipes to try!",
  twitterImage: "/nuxt-course-hero.png",
  twitterCard: "summary",
});
</script>

<template>
  <main>
    <BaseNavigation class="sticky top-0 z-50 bg-white" />
    <section class="bg-[#f1f1f1]">
      <div
        class="container flex flex-col lg:flex-row items-center py-20 gap-10"
      >
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
            Master the Kitchen with Ease: Unleash Your Inner Chef Today!
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance">
            Discover recipes helping you to find the easiest way to cook.
          </p>
          <button
            class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer"
          >
            Browse Recipes
          </button>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg
            sizes="xs:100vw sm:667px"
            format="webp"
            src="/nuxt-course-hero.png"
            densities="x1"
            alt=""
          />
        </div>
      </div>
    </section>
    <section class="py-20 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
      <div
        v-if="!error"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
      >
        <RecipeCard v-for="recipe in data?.recipes" :recipe="recipe" />
      </div>
      <p v-else class="text-xl">
        Oops, something went wrong. Please try again later.
      </p>
    </section>
  </main>
</template>
