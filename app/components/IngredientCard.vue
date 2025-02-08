<script setup lang="ts">
import { type Ingredient } from "../../types/types";

defineProps<{ ingredient: Ingredient }>();
</script>

<template>
  <!-- Declarative navigation (works automatically) -->
  <NuxtLink
    :to="`/ingredients/${ingredient.strIngredient}`"
    class="flex flex-col shadow rounded-md hover:shadow-lg transition-shadow duration-200"
  >
    <div
      class="flex flex-col shadow rounded-md text-white bg-dodgeroll-gold-400"
    >
      <!-- <NuxtImg
        :src="ingredient?.strCategoryThumb"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
        alt=""
        class="rounded-t-md"
      /> -->
      <div class="flex flex-col py-2 px-4 flex-1">
        <p class="text-xl lg:text-2xl font-semibold mb-0 text-center">
          {{ ingredient?.strIngredient }}
        </p>
        <!-- <div
          class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-1 mt-auto"
        ></div> -->
      </div>
      <!-- <div class="flex flex-col py-2 px-4 flex-1">
        <div
          class="flex items-center justify-center text-xl lg:text-2xl font-semibold mb-0"
        >
          <Icon name="mdi-food-variant" style="color: #f79f1a" class="mr-2" />
          <span>{{ ingredient?.strIngredient }}</span>
        </div>
      </div> -->
    </div>
  </NuxtLink>
</template>
