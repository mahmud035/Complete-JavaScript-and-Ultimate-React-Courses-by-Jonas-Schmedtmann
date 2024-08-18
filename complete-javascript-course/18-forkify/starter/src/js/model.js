import { API_BASE_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async (recipeId) => {
  try {
    const data = await getJSON(`${API_BASE_URL}${recipeId}`);
    const { recipe } = data?.data;

    // Store recipe object inside state.recipe
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResult = async (query) => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_BASE_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};