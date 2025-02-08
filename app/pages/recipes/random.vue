<script setup lang="ts">
import { type MealsResponse } from "../../../types/types";

const { data, error } = await useFetch<MealsResponse>(
  "https://www.themealdb.com/api/json/v1/1/random.php"
);

// Access the value inside the Ref
const mealsData = data.value;

if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage,
  });
}

interface Meal {
  [key: string]: string | null | undefined; // Now includes undefined
  strIngredient1?: string; // string | undefined is valid here
  strMeasure1?: string; // string | undefined is valid here
}

const ingredients =
  data?.value?.meals && data.value.meals.length > 0
    ? Object.entries(data.value.meals[0] as Meal)
        .filter(
          ([key, value]) =>
            key.startsWith("strIngredient") && value && value.trim() !== ""
        )
        .map(([key, value]) => {
          const measureKey = key.replace("strIngredient", "strMeasure");
          const measurement =
            (data?.value?.meals?.[0] as Meal)?.[measureKey] ?? "";

          return measurement || value
            ? `${measurement || ""} ${value}`.trim()
            : null;
        })
        .filter((item): item is string => item !== null)
    : [];

const parseInstructions = (instructionsString: string): string[] => {
  return instructionsString
    .split(/\r?\n/)
    .filter(
      (instruction) =>
        instruction.trim() !== "" &&
        !instruction.toLowerCase().includes("nutrition facts")
    )
    .map((instruction) => instruction.replace(/^\d+\.\s*/, "").trim());
};

const instructions = computed(() =>
  parseInstructions(mealsData?.meals?.[0]?.strInstructions || "")
);

useSeoMeta({
  title: mealsData?.meals?.[0]?.strMeal,
  description: "Recipes to try!",
  ogTitle: mealsData?.meals?.[0]?.strMeal,
  ogDescription: "Recipes to try!",
  ogImage: mealsData?.meals?.[0]?.strMealThumb,
  ogUrl: `http:localhost:3000/recipes/${mealsData?.meals?.[0]?.idMeal}`,
  twitterTitle: mealsData?.meals?.[0]?.strMeal,
  twitterDescription: "Recipes to try!",
  twitterImage: mealsData?.meals?.[0]?.strMealThumb,
  twitterCard: "summary",
});
</script>

<template>
  <div class="flex flex-col max-w-screen-lg container py-20">
    <!-- Header -->
    <div class="flex flex-col mb-6">
      <h2 class="text-5xl mb-4 font-semibold">
        {{ mealsData?.meals?.[0]?.strMeal }}
      </h2>
      <div class="flex gap-4 text-xl mb-6">
        <div class="flex items-center gap-1">
          <Icon name="mdi:earth" style="color: #f79f1a" />
          <span>{{ mealsData?.meals?.[0]?.strArea }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mdi:food" style="color: #f79f1a" />
          <span>{{ mealsData?.meals?.[0]?.strCategory }}</span>
        </div>
        <!-- <div class="flex items-center gap-1">
          <Icon name="mdi:star" style="color: #f79f1a" />
          <span>{{mealsData?.meals?.[0]?.strCategory}}</span>
        </div> -->
      </div>
      <hr />
    </div>

    <!-- Image -->
    <NuxtImg
      :src="mealsData?.meals?.[0]?.strMealThumb"
      densities="x1"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw"
      class="w-full max-h-[500px] object-cover rounded-md shadow-sm mb-12"
      alt=""
    />

    <!-- Ingredients -->
    <div class="mb-8">
      <h2 class="text-3xl font-semibold mb-4">Ingredients</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
        <li v-for="ingredient in ingredients">
          <label class="flex gap-2 items-center">
            <input class="hidden peer" type="checkbox" />
            <div
              class="relative w-6 h-6 rounded-full border-2 border-dodgeroll-gold-400 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-400 peer-checked:after:rounded-full"
            ></div>
            <span class="peer-checked:line-through">
              {{ ingredient }}
            </span>
          </label>
        </li>
      </ul>
    </div>

    <!-- Instructions -->
    <div>
      <h2 class="text-3xl font-semibold mb-4">Instructions</h2>
      <ul class="flex flex-col text-lg gap-4">
        <li
          v-for="(instruction, index) in instructions"
          :key="index"
          class="flex gap-2"
        >
          <span
            class="flex items-center justify-center bg-dodgeroll-gold-400 w-7 h-7 rounded-full text-white text-sm"
          >
            {{ index + 1 }}
          </span>
          <span class="flex-1">{{ instruction }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
