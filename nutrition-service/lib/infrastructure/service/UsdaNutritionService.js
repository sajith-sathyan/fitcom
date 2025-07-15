import INutritionService from "../../domain/service/INutritionService.js";
import { searchFood, fetchSuggestions } from "../utils/usdaClient.js";

export default class UsdaNutritionService extends INutritionService {
  async getNutritionData(query) {
    console.log("getNutritionData :",query)
    const food = await searchFood(query);
    if (!food) return { data: [], calories: 0 };

    const nutrients = food.foodNutrients || [];

    const data = nutrients.map((n) => ({
      name: n.nutrientName,
      value: Number(n.value),
    }));

    const kcal = nutrients.find(
      (n) =>
        n.nutrientName.toLowerCase().includes("calories") ||
        n.nutrientName.toLowerCase() === "energy"
    );

    const calories = kcal ? kcal.value : 0;

    return { data, calories };
  }

  async getSuggestions(query) {
    const foods = await fetchSuggestions(query); 
    return foods.map((food) => food.description);
  }
}
