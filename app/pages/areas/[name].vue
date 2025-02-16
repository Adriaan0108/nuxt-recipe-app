<script setup lang="ts">
import { type FiltersResponse, type Filter } from "../../../types/types";

// // Get the category from the route parameter
// const route = useRoute();
// const area = route.params.name as string;

// // Fetch meals for the category
// const { data, error } = await useFetch<FiltersResponse>(
//   `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
// );
// const meals = ref<Filter[]>([]);

// if (data.value && data.value.meals) {
//   meals.value = data.value.meals;
// } else {
//   console.error(error?.value || `Error fetching meals for country: ${area}`);
// }

const recipeStore = useRecipeStore();

const area = useRoute().params.name as string;

const fetchMealsByArea = async () => {
  await recipeStore.fetchMealsByArea(area);
};

await fetchMealsByArea();

const meals = ref();
const mealsData = recipeStore.mealsFilter;
const error = recipeStore.mealsFilterError;

if (mealsData) {
  meals.value = mealsData;
} else {
  console.error(error?.value || "Error fetching recipes");
}
</script>

<template>
  <section class="py-20 container">
    <div
      v-if="!error"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
    >
      <MealCard v-for="recipe in meals" :meal="recipe" />
    </div>
    <p v-else class="text-xl">
      Oops, something went wrong. Please try again later.
    </p>
  </section>
</template>
