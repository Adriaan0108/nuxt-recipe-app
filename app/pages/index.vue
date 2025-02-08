<script setup lang="ts">
import AreaCard from "~/components/AreaCard.vue";
import {
  type MealsResponse,
  type CategoriesResponse,
  type Category,
  type AreasResponse,
  type Area,
  type IngredientsResponse,
  type Ingredient,
} from "../../types/types";

import { ref } from "vue";
import IngredientCard from "~/components/IngredientCard.vue";

definePageMeta({ layout: "home" }); // default layout will be used if not specified here

// const { data, error } = await useFetch<MealsResponse>(
//   "https://www.themealdb.com/api/json/v1/1/random.php"
// );

const { data: categoriesData, error: categoriesError } =
  await useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

const categories = ref<Category[]>([]); // State for categories

if (categoriesData.value && categoriesData.value.categories) {
  categories.value = categoriesData.value.categories; // Update state
} else {
  console.error(categoriesError?.value || "Error fetching categories");
}

// let activeTab = "categories";
const activeTab = ref<"categories" | "countries" | "ingredients">("categories");

const { data: areasData, error: areasError } = await useFetch<AreasResponse>(
  "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
);

const areas = ref<Area[]>([]);

if (areasData.value && areasData.value.meals) {
  // areas.value = areasData.value.meals; // Update state
  // Filter out any areas with the name 'Unknown'
  areas.value = areasData.value.meals.filter(
    (area) => area.strArea !== "Unknown"
  );
} else {
  console.error(categoriesError?.value || "Error fetching areas");
}

const { data: ingredientsData, error: ingredientsError } =
  await useFetch<IngredientsResponse>(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

const ingredients = ref<Ingredient[]>([]);

if (ingredientsData.value && ingredientsData.value.meals) {
  ingredients.value = ingredientsData.value.meals; // Update state
} else {
  console.error(ingredientsData?.value || "Error fetching ingredients");
}

// Create a reactive reference to store the recipe
const recipe = ref<{ idMeal: string | null }>({ idMeal: null });

// async function showRandomRecipe() {
//   const { data, error } = await useFetch<MealsResponse>(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );

//   // Access the value inside the Ref
//   const mealsData = data.value;

//   // Safely access the meal ID and update the recipe Ref
//   recipe.value.idMeal = mealsData?.meals?.[0]?.idMeal || null;

//   if (recipe.value.idMeal) {
//     console.log("Random Meal ID:", recipe.value.idMeal);

//     navigateTo(`/recipes/${recipe.value.idMeal}`);
//   } else {
//     console.error("Meal ID not found in the response.");
//   }
// }

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

    <section class="py-5 container">
      <div class="flex gap-4 mb-6">
        <button
          @click="activeTab = 'categories'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400':
              activeTab === 'categories',
            'text-gray-500': activeTab !== 'categories',
          }"
          class="flex-1 px-4 py-2 text-center transition-all duration-200 hover:text-dodgeroll-gold-300"
        >
          Categories
        </button>
        <button
          @click="activeTab = 'countries'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400':
              activeTab === 'countries',
            'text-gray-500': activeTab !== 'countries',
          }"
          class="flex-1 px-4 py-2 text-center transition-all duration-200 hover:text-dodgeroll-gold-300"
        >
          Countries
        </button>
        <button
          @click="activeTab = 'ingredients'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400':
              activeTab === 'ingredients',
            'text-gray-500': activeTab !== 'ingredients',
          }"
          class="flex-1 px-4 py-2 text-center transition-all duration-200 hover:text-dodgeroll-gold-300"
        >
          Ingredients
        </button>
      </div>
    </section>
    <!-- Tab Content -->
    <section class="container px-10">
      <!-- Categories Tab -->
      <div
        v-if="activeTab === 'categories'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <CategoryCard
          v-for="category in categories"
          :key="category.idCategory"
          :category="category"
        />
      </div>

      <!-- Placeholder for other tabs -->
      <div
        v-else-if="activeTab === 'countries'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AreaCard v-for="area in areas" :key="area.strArea" :area="area" />
      </div>
      <div
        v-else-if="activeTab === 'ingredients'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <IngredientCard
          v-for="ingredient in ingredients"
          :key="ingredient.strIngredient"
          :ingredient="ingredient"
        />
      </div>
    </section>
  </main>
</template>
