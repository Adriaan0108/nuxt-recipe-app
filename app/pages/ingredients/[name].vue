<script setup lang="ts">
const recipeStore = useRecipeStore();

const ingredient = useRoute().params.name as string;

const fetchMealsByIngredient = async () => {
  await recipeStore.fetchMealsByIngredient(ingredient);
};

await fetchMealsByIngredient();

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
