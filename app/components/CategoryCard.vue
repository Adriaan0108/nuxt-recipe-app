<script setup lang="ts">
import { type Category } from "../../types/types";

defineProps<{ category: Category }>();
</script>

<template>
  <!-- Declarative navigation (works automatically) -->
  <NuxtLink
    :to="`/categories/${category.strCategory}`"
    class="flex flex-col shadow rounded-md hover:shadow-lg transition-shadow duration-200"
  >
    <div class="flex flex-col shadow rounded-md">
      <NuxtImg
        :src="category?.strCategoryThumb"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
        alt=""
        class="rounded-t-md"
      />
      <div class="flex flex-col py-2 px-4 flex-1">
        <p class="text-xl lg:text-2xl font-semibold mb-2 text-center">
          {{ category?.strCategory }}
        </p>
        <div
          class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-1 mt-auto"
        ></div>
      </div>
    </div>
  </NuxtLink>
</template>
