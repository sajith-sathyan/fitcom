// Use Cases (Business Logic)
import nutritionSuggestionsInteractor from '../../application/use-cases/getNutritionSuggestions.js';
import fetchNutritionInteractor from '../../application/use-cases/fetchNutritionInteractor.js';

// USDA (API-Abstraction)
import UsdaNutritionManager from '../../infrastructure/service/UsdaNutritionService.js';

const usdaNutritionManager = new UsdaNutritionManager();

export async function suggestionsController(req, res) {
    const { query } = req.query;
    try {
        const result = await nutritionSuggestionsInteractor(query, {
            usdaNutritionManager,
        });

        res.status(200).json({
            suggestionsArray: result,
        });
    } catch (err) {
        console.error("Suggestion fetch error:", err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}


export async function getNutritionController(req, res) {
    const { searchTerm } = req.query;
  console.log("getNutritionController :",searchTerm)
    try {
      const result = await fetchNutritionInteractor(searchTerm, {
        usdaNutritionManager,
      });
  
      res.status(200).json({
        nutrition: result,
      });
    } catch (err) {
      console.error("Nutrition fetch error:", err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }