export default async (weight, forWhom, userId , { calculatorsRepositories }) => {
    try {
      // Validate input
      if (!weight || weight < 2 || weight > 635) {
        throw new Error("Invalid weight. Weight should be between 2 kg and 635 kg.");
      }
  
      // Hydration formula: 35 ml per kg of body weight
      const hydration = Math.round(weight * 35);
  
      // Construct message
      let message = `Your daily hydration needs are estimated at ${hydration} ml based on the formula: weight (kg) × 35 ml.`;
  
      if (forWhom === 'me') {
        message += ` This value will be saved to your profile for personalized hydration tracking and health suggestions.`;
      } else {
        message += ` Since this is calculated for someone else, it won't be saved to your profile.`;
      }
  
      // Save to database if it's for the logged-in user
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'HydrationNeeds',
          inputData: { weight },
          result: { hydration },
          notes: `Hydration needs calculated for user ID: ${userId}.`
        });
  
      }
  
      return {
        hydration,
        message,
        info: forWhom === 'me'
          ? 'Hydration data has been saved to your profile.'
          : 'Hydration calculated for someone else (not saved).'
      };
  
    } catch (error) {
      console.error("Error in HydrationOfCalculatorInteractor:", error.message);
      throw error;
    }
  };
  