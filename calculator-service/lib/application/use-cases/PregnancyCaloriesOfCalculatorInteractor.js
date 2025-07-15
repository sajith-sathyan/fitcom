export default async (
    age, height, weight, activityLevel, trimester, userId, forWhom, unit ,
    { calculatorsRepositories }
  ) => {
    console.log(age)
    try {
      // Validate inputs
      if (!age || age <= 0 || age > 120) {
        throw new Error("Invalid age. Age should be between 1 and 120.");
      }
  
      if (!height || height <= 0 || height > 300) {
        throw new Error("Invalid height. Height should be between 1 cm and 300 cm.");
      }
  
      if (!weight || weight <= 0 || weight > 500) {
        throw new Error("Invalid weight. Weight should be between 1 kg and 500 kg.");
      }
  
      if (!activityLevel || activityLevel < 1.2 || activityLevel > 1.9) {
        throw new Error("Invalid activity level.");
      }
  
      if (![1, 2, 3].includes(Number(trimester))) {
        throw new Error("Invalid trimester. Must be 1, 2, or 3.");
      }
  
      // BMR calculation (Mifflin-St Jeor equation for women)
      const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      const tdee = bmr * activityLevel;
  
      // Additional calories based on trimester
      let additionalCalories = 0;
      if (trimester === 2) additionalCalories = 340;
      else if (trimester === 3) additionalCalories = 450;
  
      const calorieNeed = Math.round(tdee + additionalCalories);
  
      // Construct message
      let message = `Your estimated daily calorie needs during the ${trimester} trimester are ${calorieNeed} kcal.`;
      if (trimester === 2) message += ` This includes an additional 340 kcal for the second trimester.`;
      if (trimester === 3) message += ` This includes an additional 450 kcal for the third trimester.`;
  
      if (forWhom === 'me') {
        message += ` This result will be saved for personalized nutrition recommendations.`;
      } else {
        message += ` This was calculated for someone else and won't be saved.`;
      }
  
      // Persist data if for self
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'PregnancyCalorie',
          inputData: { age, height, weight, activityLevel, trimester },
          result: { calorieNeed },
          notes: `Pregnancy calorie needs calculated for user ID: ${userId}.`
        });
      }
  
      return {
        calorieNeed,
        message,
        info:
          forWhom === 'me'
            ? 'Calorie data has been saved to your profile.'
            : 'Calculated for someone else (not saved).',
      };
  
    } catch (error) {
      console.error("Error in PregnancyCalorieCalculatorInteractor:", error.message);
      throw error;
    }
  };
  