export default async (
    gi,
    carbs,
    userId,
    forWhom,
    { calculatorsRepositories }
  ) => {
    try {
      // Input Validation
      if (gi === undefined || carbs === undefined) {
        throw new Error("Both glycemic index (GI) and carbohydrate amount are required.");
      }
  
      if (typeof gi !== 'number' || gi <= 0 || gi > 150) {
        throw new Error("Glycemic Index (GI) must be a number between 1 and 150.");
      }
  
      if (typeof carbs !== 'number' || carbs <= 0 || carbs > 300) {
        throw new Error("Carbohydrates must be a number between 1 and 300 grams.");
      }
  
      // Calculate Glycemic Load
      const glycemicLoad = parseFloat(((gi * carbs) / 100).toFixed(2));
  
      // Optional message
      let message;
      if (glycemicLoad < 10) {
        message = "Low Glycemic Load: Great choice for stable blood sugar.";
      } else if (glycemicLoad <= 20) {
        message = "Moderate Glycemic Load: Safe for most, but watch portion sizes.";
      } else {
        message = "High Glycemic Load: May spike blood sugar. Consider alternatives.";
      }
  
      // Save if for self
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'GlycemicLoad',
          inputData: { gi, carbs },
          result: { glycemicLoad },
          notes: 'Glycemic Load calculated using GI and carbohydrate input',
        });
      }
  
      return {
        glycemicLoad,
        message,
        info: forWhom === 'me'
          ? "Glycemic Load saved to your profile."
          : "Glycemic Load calculated (not saved)."
      };
  
    } catch (error) {
      console.error("Error in GlycemicLoadCalculatorInteractor:", error.message);
      throw error;
    }
  };
  