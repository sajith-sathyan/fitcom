export default async function (query, { usdaNutritionManager }) {
    if (!query || typeof query !== 'string') {
      throw new Error("Invalid or missing query");
    }
  
    try {
      const suggestions = await usdaNutritionManager.getSuggestions(query);
    
      return suggestions;
    } catch (error) {
      console.error("Error fetching suggestions:", error.message || error);
      throw new Error("Failed to fetch nutrition suggestions");
    }
  }
  