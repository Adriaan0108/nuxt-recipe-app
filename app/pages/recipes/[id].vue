<script setup lang="ts">
const router = useRouter();

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

// Computed property to extract and format ingredients from the recipe data
const ingredients = computed(() => {
  // Return empty array if recipe isn't loaded yet
  if (!recipe.value) return [];

  // Create an array of ingredients with their measurements
  const result = [];

  // Loop through all properties of the recipe
  for (const [key, value] of Object.entries(recipe.value)) {
    // Check if this property is an ingredient and has a value
    if (
      key.startsWith("strIngredient") &&
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      // Find the corresponding measurement
      // Replace the text "strIngredient" with "strMeasure", creating a new property name (like strMeasure1)
      const measureKey = key.replace("strIngredient", "strMeasure");
      const measurement = recipe.value[measureKey] || "";

      // Combine measurement and ingredient
      if (typeof measurement === "string") {
        result.push(`${measurement} ${value}`.trim());
      }
    }
  }

  return result;
});

// Function to convert the instructions string into an array of steps
function parseInstructions(instructionsText: string): string[] {
  // Return empty array if no instructions
  if (!instructionsText) return [];

  // Split the text by newlines
  return instructionsText
    .split(/\r?\n/) // Split by any type of newline
    .filter((line) => {
      // Remove empty lines and nutrition facts
      const trimmedLine = line.trim();
      return (
        trimmedLine !== "" &&
        !trimmedLine.toLowerCase().includes("nutrition facts")
      );
    })
    .map((line) => {
      // Remove numbering from the beginning of instructions
      return line.replace(/^\d+\.\s*/, "").trim();
    });
}

// Computed property to get formatted instructions
const instructions = computed(() => {
  return parseInstructions(recipe.value?.strInstructions || "");
});

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
  <div class="flex flex-col max-w-screen-lg container py-5">
    <div class="mb-4">
      <BaseBtn @click="router.back()" label="Back" />
    </div>
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
