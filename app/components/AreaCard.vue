<script setup lang="ts">
import { type Area } from "../../types/types";

defineProps<{ area: Area }>();
</script>

<!-- https://flagdownload.com/ -->

<template>
  <NuxtLink
    :to="`/areas/${area.strArea}`"
    class="flex flex-col shadow rounded-md hover:shadow-lg transition-shadow duration-200"
  >
    <div class="flex flex-col shadow rounded-md">
      <NuxtImg
        :src="`/flags/${area?.strArea.toLowerCase()}.png`"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
        alt=""
        class="rounded-t-md"
      />
      <div class="flex flex-col py-2 px-4 flex-1">
        <p class="text-xl lg:text-2xl font-semibold mb-2 text-center">
          {{ area?.strArea }}
        </p>
        <div
          class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-1 mt-auto"
        ></div>
        <!-- <BaseBtn :to="`/recipes/${recipe?.idMeal}`" label="View" /> -->
      </div>
    </div>
  </NuxtLink>
</template>
