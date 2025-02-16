<script setup lang="ts">
const recipeStore = useRecipeStore();

const id = useRoute().params.id as string;

const fetchMealById = async () => {
  await recipeStore.fetchMealById(id);
};

await fetchMealById();

const recipe = ref();
const recipeData = recipeStore.recipe;
const recipeError = recipeStore.mealsError;

if (recipeData) {
  recipe.value = recipeData;
} else {
  console.error(recipeError?.value || "Error fetching recipe");
}

const ingredients = computed(() => {
  if (!recipe.value) return [];

  return Object.entries(recipe.value)
    .filter(
      ([key, value]) =>
        key.startsWith("strIngredient") &&
        typeof value === "string" &&
        value.trim() !== ""
    )
    .map(([key, value]) => {
      const measureKey = key.replace("strIngredient", "strMeasure");
      const measurement = recipe.value[measureKey] ?? "";

      return typeof value === "string" && typeof measurement === "string"
        ? `${measurement} ${value}`.trim()
        : null;
    })
    .filter((item): item is string => item !== null);
});

const parseInstructions = (instructionsString: string): string[] => {
  if (!instructionsString) return [];

  return instructionsString
    .split(/\r?\n/)
    .filter(
      (instruction) =>
        instruction.trim() !== "" &&
        !instruction.toLowerCase().includes("nutrition facts")
    )
    .map((instruction) => instruction.replace(/^\d+\.\s*/, "").trim());
};

const instructions = computed(() =>
  parseInstructions(recipe.value?.strInstructions || "")
);

useSeoMeta({
  title: recipe.value?.strMeal,
  description: "Recipes to try!",
  ogTitle: recipe.value?.strMeal,
  ogDescription: "Recipes to try!",
  ogImage: recipe.value?.strMealThumb,
  ogUrl: `http://localhost:3000/recipes/${recipe.value?.idMeal}`,
  twitterTitle: recipe.value?.strMeal,
  twitterDescription: "Recipes to try!",
  twitterImage: recipe.value?.strMealThumb,
  twitterCard: "summary",
});
</script>

<template>
  <div class="flex flex-col max-w-screen-lg container py-20">
    <!-- Header -->
    <div class="flex flex-col mb-6">
      <h2 class="text-5xl mb-4 font-semibold">
        {{ recipe.strMeal }}
      </h2>
      <div class="flex gap-4 text-xl mb-6">
        <div class="flex items-center gap-1">
          <Icon name="mdi:earth" style="color: #f79f1a" />
          <span>{{ recipe.strArea }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mdi:food" style="color: #f79f1a" />
          <span>{{ recipe.strCategory }}</span>
        </div>
        <!-- <div class="flex items-center gap-1">
          <Icon name="mdi:star" style="color: #f79f1a" />
          <span>{{mealsData?.meals?.[0]?.strCategory}}</span>
        </div> -->
      </div>
      <hr />
    </div>

    <!-- Image -->
    <NuxtImg
      :src="recipe.strMealThumb"
      densities="x1"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw"
      class="w-full max-h-[500px] object-cover rounded-md shadow-sm mb-12"
      alt=""
    />

    <!-- Ingredients -->
    <div class="mb-8">
      <h2 class="text-3xl font-semibold mb-4">Ingredients</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
        <li v-for="ingredient in ingredients">
          <label class="flex gap-2 items-center">
            <input class="hidden peer" type="checkbox" />
            <div
              class="relative w-6 h-6 rounded-full border-2 border-dodgeroll-gold-400 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-400 peer-checked:after:rounded-full"
            ></div>
            <span class="peer-checked:line-through">
              {{ ingredient }}
            </span>
          </label>
        </li>
      </ul>
    </div>

    <!-- Instructions -->
    <div>
      <h2 class="text-3xl font-semibold mb-4">Instructions</h2>
      <ul class="flex flex-col text-lg gap-4">
        <li
          v-for="(instruction, index) in instructions"
          :key="index"
          class="flex gap-2"
        >
          <span
            class="flex items-center justify-center bg-dodgeroll-gold-400 w-7 h-7 rounded-full text-white text-sm"
          >
            {{ index + 1 }}
          </span>
          <span class="flex-1">{{ instruction }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
