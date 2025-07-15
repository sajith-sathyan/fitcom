export default async (
    userId,
    waist,
    height,
    forWhom,
    { calculatorsRepositories }
  ) => {
    try {
      // Validation
      if (!waist || waist <= 0 || waist > 200) {
        throw new Error("Waist should be a valid number between 1 and 200 cm.");
      }
  
      if (!height || height <= 0 || height > 272) {
        throw new Error("Height should be a valid number between 1 and 272 cm.");
      }
  
      const whtr = waist / height;
      const whtrRounded = parseFloat(whtr.toFixed(2));
  
      // Health category classification (general guidelines)
      let category = '';
      if (whtr < 0.40) category = 'Extremely Slim';
      else if (whtr < 0.50) category = 'Healthy';
      else if (whtr < 0.60) category = 'Overweight';
      else category = 'Obese';
  
      let message = `Your Waist-to-Height Ratio is ${whtrRounded} (${category}).`;
      let info = '';
  
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'WaistToHeightRatio',
          inputData: { waist, height },
          result: { whtr: whtrRounded, category },
          notes: `WHtR calculated and saved for user ${userId}.`
        });
  
        message += ` This result has been saved to your profile.`;
        info = "Saved to your profile.";
      } else {
        message += ` This result is for someone else and not saved.`;
        info = "Not saved (external use).";
      }
      return {
        whtr: whtrRounded,
        category,
        message,
        info,
      };
    } catch (error) {
      console.error("Error in WaistToHeightRatioCalculatorInteractor:", error.message);
      throw error;
    }
  };
  