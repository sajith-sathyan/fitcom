export default async (
    userId,
    calories,
    proteinPercentage,
    carbsPercentage,
    fatsPercentage,
    forWhom,
    { calculatorsRepositories }
  ) => {
    try {
     
  
      // Validation
      const totalPercentage = proteinPercentage + carbsPercentage + fatsPercentage;
      if (totalPercentage !== 100) {
        throw new Error("The sum of macro percentages must equal 100.");
      }
  
      if (calories <= 0) {
        throw new Error("Calories must be a positive number.");
      }
  
      // Macro calories
      const proteinCalories = (calories * proteinPercentage) / 100;
      const carbsCalories = (calories * carbsPercentage) / 100;
      const fatsCalories = (calories * fatsPercentage) / 100;
  
      // Macro grams
      const proteinGrams = (proteinCalories / 4).toFixed(2);
      const carbsGrams = (carbsCalories / 4).toFixed(2);
      const fatsGrams = (fatsCalories / 9).toFixed(2);
  
      let message = `Your Macro Split (based on ${calories} kcal):`;
      message += ` Protein: ${proteinGrams}g, Carbs: ${carbsGrams}g, Fats: ${fatsGrams}g.`;
  
      if (forWhom === 'me') {
        message += ` These values are saved for personalization.`;
  
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'MacroSplit',
          inputData: {
            calories,
            proteinPercentage,
            carbsPercentage,
            fatsPercentage,
          },
          result: {
            proteinGrams,
            carbsGrams,
            fatsGrams,
          },
          notes: `Macro split calculated and saved for user ${userId}.`,
        });
  
        console.log(`Macro split saved for user ${userId}`);
      } else {
        message += ` These values are calculated for someone else (not saved).`;
      }

    
  
      return {
        proteinGrams,
        carbsGrams,
        fatsGrams,
        message,
        info: forWhom === 'me' ? "Saved to your profile." : "Not saved (external use).",
      };
    } catch (error) {
      console.error("Error in MacroSplitCalculatorInteractor:", error.message);
      throw error;
    }
  };
  