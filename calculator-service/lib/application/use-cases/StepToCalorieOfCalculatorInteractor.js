export default async (
    steps, weight, userId, forWhom,
    { calculatorsRepositories }
  ) => {
    try {
      // ✅ Input validation
      if (!steps || steps <= 0 || steps > 100000) {
        throw new Error("Invalid step count. Steps should be between 1 and 100,000.");
      }
  
      if (!weight || weight <= 0 || weight > 300) {
        throw new Error("Invalid weight. Weight should be between 1 and 300 kg.");
      }
  
      // ✅ Core Calculation
      const calories = steps * weight * 0.0004;
      const caloriesRounded = parseFloat(calories.toFixed(2));
  
      // ✅ Message Construction
      let message = `You burned approximately ${caloriesRounded} kcal from ${steps} steps at a weight of ${weight} kg.`;
  
      if (forWhom === 'me') {
        message += ` This result will be saved for your personalized tracking.`;
      } else {
        message += ` This was calculated for someone else and will not be stored.`;
      }
  
      // ✅ Save to repository if for self
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'StepToCalorie',
          inputData: { steps, weight },
          result: { calories: caloriesRounded },
          notes: `Step-to-calorie conversion saved for user ID: ${userId}.`
        });
      }
  
      return {
        calories: caloriesRounded,
        message,
        info:
          forWhom === 'me'
            ? 'Calorie data has been saved to your profile.'
            : 'Calculated for someone else (not saved).',
      };
    } catch (error) {
      console.error("Error in StepToCalorieConverterInteractor:", error.message);
      throw error;
    }
  };
  