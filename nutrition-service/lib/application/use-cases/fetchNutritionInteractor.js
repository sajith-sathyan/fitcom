export default async function (query, { usdaNutritionManager }) {
    if (!query || typeof query !== 'string') {
      throw new Error("Invalid or missing query");
    }
  
    try {
      const result = await usdaNutritionManager.getNutritionData(query);
      console.log("result :",result)
      return result;
    } catch (error) {
      console.error("Error fetching nutrition data:", error.message || error);
      throw new Error("Failed to fetch nutrition data");
    }
  }
  