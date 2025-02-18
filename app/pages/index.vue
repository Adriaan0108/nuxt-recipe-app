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

// Data and methods for dropdown functionality

const isDropdownOpen = ref(false);

// Dropdown options
const dropdownOptions = [
  { value: "categories", label: "Categories" },
  { value: "countries", label: "Countries" },
  { value: "ingredients", label: "Ingredients" },
];

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Function to set the active tab and close the dropdown
const selectTab = (tab: "categories" | "countries" | "ingredients") => {
  activeTab.value = tab;
  isDropdownOpen.value = false;
};

// Function to capitalize first letter of the tab name
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

useSeoMeta({
  title: "NuxtRecipes",
  description: "Recipes to try!",
  ogTitle: "NuxtRecipes",
  ogDescription: "Recipes to try!",
  ogImage: "/nuxt-course-hero.png",
  ogUrl: `http:localhost:3000`,
  twitterTitle: "NuxtRecipes",
  twitterDescription: "Recipes to try!",
  twitterImage: "/nuxt-course-hero.png",
  twitterCard: "summary",
});
</script>

<template>
  <main>
    <BaseNavigation class="sticky top-0 z-50 bg-white" />
    <section
      class="py-5 container pb-6 sticky top-20 z-40 bg-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-4 after:bg-gradient-to-b after:from-white after:to-transparent"
    >
      <!-- Responsive Navigation: Dropdown on mobile, Tabs on larger screens -->

      <div class="block md:hidden">
        <!-- <select
          v-model="activeTab"
          class="w-full px-4 py-2 text-xl font-bold border rounded-lg shadow-md"
        >
          <option value="categories">Categories</option>
          <option value="countries">Countries</option>
          <option value="ingredients">Ingredients</option>
        </select> -->

        <div class="relative">
          <button
            @click="toggleDropdown"
            class="w-full px-4 py-2 text-xl font-semibold border rounded-lg shadow-md flex justify-between items-center bg-white"
          >
            <span>{{ capitalize(activeTab) }}</span>
            <!-- Arrow icon change based on dropdown state -->
            <!-- Use mdi-chevron-down and mdi-chevron-up icons -->
            <span>
              <Icon
                v-if="!isDropdownOpen"
                name="mdi:chevron-down"
                class="text-black w-8 h-8 mt-2"
              />
              <Icon
                v-if="isDropdownOpen"
                name="mdi:chevron-up"
                class="text-black w-8 h-8 mt-2"
              />
            </span>
          </button>
          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute left-0 w-full mt-1 bg-white shadow-lg rounded-lg z-10"
          >
            <div
              v-for="option in dropdownOptions"
              :key="option.value"
              @click="
                selectTab(
                  option.value as 'categories' | 'countries' | 'ingredients'
                )
              "
              class="px-4 py-2 text-xl text-gray-700 cursor-pointer hover:bg-dodgeroll-gold-400 hover:text-white"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
      </div>

      <div class="hidden md:flex gap-4 mb-6 bg-white">
        <button
          @click="activeTab = 'categories'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400':
              activeTab === 'categories',
            'text-black': activeTab !== 'categories',
          }"
          class="flex-1 px-4 py-2 text-xl font-bold text-center transition-all duration-200 hover:text-dodgeroll-gold-300 bg-white"
        >
          Categories
        </button>
        <button
          @click="activeTab = 'countries'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400 ':
              activeTab === 'countries',
            'text-black': activeTab !== 'countries',
          }"
          class="flex-1 px-4 py-2 text-xl font-bold text-center transition-all duration-200 hover:text-dodgeroll-gold-300 bg-white"
        >
          Countries
        </button>
        <button
          @click="activeTab = 'ingredients'"
          :class="{
            'border-b-4 border-dodgeroll-gold-400 text-dodgeroll-gold-400':
              activeTab === 'ingredients',
            'text-black': activeTab !== 'ingredients',
          }"
          class="flex-1 px-4 py-2 text-xl font-bold text-center transition-all duration-200 hover:text-dodgeroll-gold-300 bg-white"
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
    <section class="pt-5 container px-10">
      <!-- Placeholder content or just an empty section to add spacing -->
    </section>
  </main>
</template>

<style scoped>
/* Add spacing to prevent content from appearing behind the fixed header */
/* main {
  padding-top: env(safe-area-inset-top, 0px);
} */
</style>
