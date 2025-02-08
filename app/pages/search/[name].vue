<script setup lang="ts">
import { type FiltersResponse, type Filter } from "../../../types/types";

// Get the category from the route parameter
const route = useRoute();
const search = route.params.name as string;

const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
  search
)}`;

// Fetch meals for the search result
// const { data, error } = await useFetch<FiltersResponse>(
//   `www.themealdb.com/api/json/v1/1/search.php?s=${search}`
// );

const { data, error } = await useFetch<FiltersResponse>(apiUrl);
const meals = ref<Filter[]>([]);
const fetchError = ref<string | null>(null); // Create a ref for error message

if (data.value && data.value.meals) {
  meals.value = data.value.meals;
} else {
  console.error(
    error?.value || `Error fetching meals for search term: ${search}`
  );
  fetchError.value =
    error.value?.message || `Error fetching meals for search term: ${search}`;
}
</script>

<template>
  <section class="py-20 container">
    <div
      v-if="!fetchError"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
    >
      <MealCard v-for="recipe in data?.meals" :meal="recipe" />
    </div>
    <p v-else class="text-xl text-red-600">
      <!-- Oops, something went wrong. Please try again later. -->
      No recipes found for search term: {{ search }}
      <!-- {{ fetchError }} -->
    </p>
  </section>
</template>
