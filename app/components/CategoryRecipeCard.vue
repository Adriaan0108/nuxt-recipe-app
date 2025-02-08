<script setup lang="ts">
import { type Filter } from "../../types/types";

defineProps<{ response: Filter }>();
</script>

<template>
  <div class="flex flex-col shadow rounded-md">
    <NuxtImg
      :src="response?.strMealThumb"
      sizes="xs:100vw sm:50vw lg:400px"
      format="webp"
      densities="x1"
      alt=""
      class="rounded-t-md"
    />
    <div class="flex flex-col py-6 px-4 flex-1">
      <p class="text-xl lg:text-2xl font-semibold mb-2">
        {{ response?.strMeal }}
      </p>
      <div
        class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto"
      ></div>
      <!-- <BaseBtn :to="`/recipes/${recipe?.idMeal}`" label="View" /> -->
    </div>
  </div>
</template>
