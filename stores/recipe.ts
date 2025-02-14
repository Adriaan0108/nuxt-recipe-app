import { $fetch } from "ofetch";
import type {
  Area,
  AreasResponse,
  CategoriesResponse,
  Category,
  Ingredient,
  IngredientsResponse,
} from "~~/types/types";

export const useRecipeStore = defineStore("recipe", () => {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

  const recipe = ref();

  const areas = ref<Area[]>([]);
  const areasError = ref();

  const categories = ref<Category[]>([]); // Initialize as an empty array
  const categoriesError = ref();

  const ingredients = ref<Ingredient[]>([]);
  const ingredientsError = ref();

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
      // const res = await $fetch<CategoriesResponse>(
      //   "https://www.themealdb.com/api/json/v1/1/categories.php"
      // );
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
      // const res = await $fetch<AreasResponse>(
      //   "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      // );
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
      // const res = await $fetch<IngredientsResponse>(
      //   "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      // );
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

  return {
    recipe,
    categories,
    categoriesError,
    areas,
    areasError,
    ingredients,
    ingredientsError,
    fetchCategories,
    fetchAreas,
    fetchIngredients,
  };
});
