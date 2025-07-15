export default async (
    weight,
    activityLevel,
    userId,
    forWhom,
    { calculatorsRepositories }
  ) => {
    try {
      // Input validation
      if (!weight || isNaN(weight) || weight <= 0 || weight > 500) {
        throw new Error("Invalid weight. Weight should be between 1 kg and 500 kg.");
      }
  
      if (!activityLevel || isNaN(activityLevel) || activityLevel < 0.8 || activityLevel > 2.5) {
        throw new Error("Invalid activity level. Activity level should be between 0.8 and 2.5.");
      }
  
      // Protein requirement calculation
      const proteinNeed = parseFloat((weight * activityLevel).toFixed(2));
  
      // Message construction
      let message = `Your estimated daily protein requirement is ${proteinNeed} grams based on your weight and activity level.`;
      if (forWhom === 'me') {
        message += ` This result will be saved and used for personalized nutrition recommendations.`;
      } else {
        message += ` This was calculated for someone else and won't be saved.`;
      }
  
      // Persist data if for the user themself
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'ProteinRequirement',
          inputData: { weight, activityLevel },
          result: { proteinNeed },
          notes: `Protein requirement calculated for user ID: ${userId}.`,
        });
      }
  
      return {
        proteinNeed,
        message,
        info:
          forWhom === 'me'
            ? 'Protein requirement data has been saved to your profile.'
            : 'Calculated for someone else (not saved).',
      };
  
    } catch (error) {
      console.error("Error in ProteinRequirementCalculatorInteractor:", error.message);
      throw error;
    }
  };
  