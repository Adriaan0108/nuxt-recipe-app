import { $fetch } from "ofetch";
import type {
  Area,
  AreasResponse,
  CategoriesResponse,
  Category,
  Filter,
  FiltersResponse,
  Ingredient,
  IngredientsResponse,
  Meal,
  MealsResponse,
} from "~~/types/types";

export const useRecipeStore = defineStore("recipe", () => {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

  const recipe = ref<Meal>();

  const mealsFilter = ref<Filter[]>([]);
  const mealsFilterError = ref();
  const meals = ref<Meal[]>([]);
  const mealsError = ref();

  const areas = ref<Area[]>([]);
  const areasError = ref();

  const categories = ref<Category[]>([]); // Initialize as an empty array
  const categoriesError = ref();

  const ingredients = ref<Ingredient[]>([]);
  const ingredientsError = ref();

  const mealsAreaCache = new Map<string, Filter[]>(); // Cache to store fetched meals
  const mealsCategoryCache = new Map<string, Filter[]>();
  const mealsIngredientCache = new Map<string, Filter[]>();

  const fetchCategories = async () => {
    // Check if categories already have valid data
    if (
      categories.value.length > 0 &&
      categories.value.every(
        (category) => category.idCategory && category.strCategory
      )
    ) {
      console.log("Categories already fetched, skipping API call.");
      return;
    }

    try {
      const res = await $fetch<CategoriesResponse>(`${baseUrl}categories.php`);

      categories.value = res.categories ?? []; // Ensure it's always an array
    } catch (error) {
      const message = "Error fetching categories: " + error;
      categoriesError.value = message;
      console.log(message);
    }
  };

  const fetchAreas = async () => {
    // Check if areas already have valid data
    if (areas.value.length > 0 && areas.value.every((area) => area.strArea)) {
      console.log("Areas already fetched, skipping API call.");
      return;
    }

    try {
      const res = await $fetch<AreasResponse>(`${baseUrl}list.php?a=list`);

      areas.value = res.meals ?? [];
    } catch (error) {
      const message = "Error fetching countries: " + error;
      areasError.value = message;
      console.log(message);
    }
  };

  const fetchIngredients = async () => {
    // Check if ingredients already have valid data
    if (
      ingredients.value.length > 0 &&
      ingredients.value.every(
        (ingredient) => ingredient.idIngredient && ingredient.strIngredient
      )
    ) {
      console.log("Ingredients already fetched, skipping API call.");
      return;
    }

    try {
      const res = await $fetch<IngredientsResponse>(
        `${baseUrl}list.php?i=list`
      );

      ingredients.value = res.meals ?? [];
    } catch (error) {
      const message = "Error fetching ingredients: " + error;
      ingredientsError.value = message;
      console.log(message);
    }
  };

  const fetchMealById = async (id: number | string) => {
    try {
      const res = await $fetch<MealsResponse>(`${baseUrl}lookup.php?i=${id}`);

      meals.value = res.meals ?? [];
      recipe.value = meals.value[0];
    } catch (error) {
      const message = "Error fetching recipe: " + error;
      mealsError.value = message;
      console.log(message);
    }
  };

  const fetchRandomRecipe = async () => {
    try {
      const res = await $fetch<MealsResponse>(`${baseUrl}random.php`);

      meals.value = res.meals ?? [];
      recipe.value = meals.value[0];
    } catch (error) {
      const message = "Error fetching random recipe: " + error;
      mealsError.value = message;
      console.log(message);
    }
  };

  // const fetchMealsByArea = async (area: string) => {
  //   if (
  //     mealsFilter.value.length > 0 &&
  //     mealsFilter.value.every((meal) => meal.idMeal && meal.strMeal)
  //   ) {
  //     console.log("Meals already fetched, skipping API call.");
  //     return;
  //   }

  //   try {
  //     const res = await $fetch<FiltersResponse>(
  //       `${baseUrl}filter.php?a=${area}`
  //     );

  //     mealsFilter.value = res.meals ?? [];
  //   } catch (error) {
  //     const message = "Error fetching recipes: " + error;
  //     mealsFilterError.value = message;
  //     console.log(message);
  //   }
  // };

  const fetchMealsByArea = async (area: string) => {
    if (mealsAreaCache.has(area)) {
      console.log(`Meals for ${area} already fetched, using cache.`);
      mealsFilter.value = mealsAreaCache.get(area) ?? [];
      return;
    }

    try {
      const res = await $fetch<FiltersResponse>(
        `${baseUrl}filter.php?a=${area}`
      );
      const meals = res.meals ?? [];

      mealsAreaCache.set(area, meals); // Store fetched meals in cache
      mealsFilter.value = meals;
    } catch (error) {
      const message = `Error fetching recipes: ${error}`;
      mealsFilterError.value = message;
      console.log(message);
    }
  };

  const fetchMealsByCategory = async (category: string) => {
    if (mealsCategoryCache.has(category)) {
      console.log(`Meals for ${category} already fetched, using cache.`);
      mealsFilter.value = mealsAreaCache.get(category) ?? [];
      return;
    }

    try {
      const res = await $fetch<FiltersResponse>(
        `${baseUrl}filter.php?c=${category}`
      );
      const meals = res.meals ?? [];

      mealsCategoryCache.set(category, meals); // Store fetched meals in cache
      mealsFilter.value = meals;
    } catch (error) {
      const message = `Error fetching recipes: ${error}`;
      mealsFilterError.value = message;
      console.log(message);
    }
  };

  const fetchMealsByIngredient = async (ingredient: string) => {
    if (mealsIngredientCache.has(ingredient)) {
      console.log(`Meals for ${ingredient} already fetched, using cache.`);
      mealsFilter.value = mealsIngredientCache.get(ingredient) ?? [];
      return;
    }

    try {
      const res = await $fetch<FiltersResponse>(
        `${baseUrl}filter.php?i=${ingredient}`
      );
      const meals = res.meals ?? [];

      mealsIngredientCache.set(ingredient, meals); // Store fetched meals in cache
      mealsFilter.value = meals;
    } catch (error) {
      const message = `Error fetching recipes: ${error}`;
      mealsFilterError.value = message;
      console.log(message);
    }
  };

  const searchMeal = async (search: string) => {
    try {
      const res = await $fetch<FiltersResponse>(
        `${baseUrl}search.php?s=${search}`
      );
      const meals = res.meals ?? [];

      mealsFilter.value = meals;
    } catch (error) {
      const message = `Error fetching recipes: ${error}`;
      mealsFilterError.value = message;
      console.log(message);
    }
  };

  return {
    recipe,
    meals,
    mealsFilter,
    mealsFilterError,
    mealsError,
    categories,
    categoriesError,
    areas,
    areasError,
    ingredients,
    ingredientsError,
    fetchCategories,
    fetchAreas,
    fetchIngredients,
    fetchRandomRecipe,
    fetchMealById,
    fetchMealsByArea,
    fetchMealsByCategory,
    fetchMealsByIngredient,
    searchMeal,
  };
});
