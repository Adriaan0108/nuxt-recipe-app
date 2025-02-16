<script setup lang="ts">
const router = useRouter();

const recipeStore = useRecipeStore();

const category = useRoute().params.name as string;

const fetchMealsByCategory = async () => {
  await recipeStore.fetchMealsByCategory(category);
};

await fetchMealsByCategory();

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
  <section class="py-5 container">
    <div class="mb-4">
      <BaseBtn @click="router.back()" label="Back" />
    </div>
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
