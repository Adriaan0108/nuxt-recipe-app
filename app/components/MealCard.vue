<script setup lang="ts">
import { type Filter } from "../../types/types";

defineProps<{ meal: Filter }>();
</script>

<template>
  <NuxtLink
    :to="`/recipes/${meal.idMeal}`"
    class="flex flex-col shadow rounded-md hover:shadow-lg transition-shadow duration-200"
  >
    <div class="flex flex-col shadow rounded-md">
      <NuxtImg
        :src="meal?.strMealThumb"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
        alt=""
        class="rounded-t-md"
      />
      <div class="flex flex-col py-6 px-4 flex-1">
        <p class="text-xl lg:text-2xl font-semibold mb-2">
          {{ meal?.strMeal }}
        </p>
        <!-- <BaseBtn :to="`/recipes/${recipe?.idMeal}`" label="View" /> -->
      </div>
    </div>
  </NuxtLink>
</template>
