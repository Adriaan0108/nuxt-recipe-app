<script setup lang="ts">
import { type Category, type Area, type Ingredient } from "../../types/types";

definePageMeta({ layout: "home" }); // default layout will be used if not specified here

const recipeStore = useRecipeStore();

const fetchCategories = async () => {
  await recipeStore.fetchCategories();
};

await fetchCategories();

const categories = ref<Category[]>([]);
const categoriesData = recipeStore.categories;
const categoriesError = recipeStore.categoriesError;

if (categoriesData && categoriesData.length > 0) {
  categories.value = categoriesData;
} else {
  console.error(categoriesError?.value || "Error fetching categories");
}

const activeTab = ref<"categories" | "countries" | "ingredients">("categories");

const fetchAreas = async () => {
  await recipeStore.fetchAreas();
};

await fetchAreas();

const areas = ref<Area[]>([]);
const areasData = recipeStore.areas;
const areasError = recipeStore.areasError;

if (areasData && areasData.length > 0) {
  // Filter out any areas with the name 'Unknown'
  areas.value = areasData.filter((area) => area.strArea !== "Unknown");
} else {
  console.error(areasError?.value || "Error fetching areas");
}

const fetchIngredients = async () => {
  await recipeStore.fetchIngredients();
};

await fetchIngredients();

const ingredients = ref<Ingredient[]>([]);
const ingredientsData = recipeStore.ingredients;
const ingredientsError = recipeStore.ingredientsError;

if (ingredientsData && ingredientsData.length > 0) {
  ingredients.value = ingredientsData;
} else {
  console.error(ingredientsError?.value || "Error fetching ingredients");
}

// Create a reactive reference to store the recipe
const recipe = ref<{ idMeal: string | null }>({ idMeal: null });

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
