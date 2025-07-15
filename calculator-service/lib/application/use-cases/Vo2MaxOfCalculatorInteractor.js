export default async (
    age, weight, time, heartRate, gender, forWhom, userId,
    { calculatorsRepositories }
  ) => {

    try {
      // --------- Validation ---------
      if (age <= 0) throw new Error("Age must be a positive number.");
      if (weight <= 0) throw new Error("Weight must be a positive number.");
      if (time <= 0) throw new Error("Time must be a positive number.");
      if (heartRate <= 0) throw new Error("Heart rate must be a positive number.");
      if (!['male', 'female'].includes(gender)) throw new Error("Invalid gender value.");
  
      // --------- VO2 Max Calculation (Rockport Walk Test Formula) ---------
      // Formula (for miles, convert weight from kg to lbs)
      // VO2 max = 132.853 - (0.0769 × weight in lbs) - (0.3877 × age) + (6.315 × genderValue) - (3.2649 × time) - (0.1565 × heart rate)
      const weightLbs = weight * 2.20462;
      const genderValue = gender === 'male' ? 1 : 0;
  
      const vo2Max = 132.853 
        - (0.0769 * weightLbs)
        - (0.3877 * age)
        + (6.315 * genderValue)
        - (3.2649 * time)
        - (0.1565 * heartRate);
  
      const roundedVo2Max = parseFloat(vo2Max.toFixed(2));
  
      let message = `Your estimated VO₂ Max is ${roundedVo2Max} ml/kg/min.`;
  
      if (forWhom === 'me') {
        await calculatorsRepositories.persist({
          userId,
          calculationType: 'VO2Max',
          inputData: {
            age,
            weight,
            time,
            heartRate,
            gender,
          },
          result: {
            vo2Max: roundedVo2Max,
          },
          notes: `VO2 Max calculated and saved for user ${userId}.`,
        });
  
        message += ' This result has been saved to your profile.';
      } else {
        message += ' This result is calculated for someone else (not saved).';
      }
      return {
        vo2Max: roundedVo2Max,
        message,
        info: forWhom === 'me' ? 'Saved to your profile.' : 'Not saved (external use).',
      };
  
    } catch (error) {
      console.error("Error in Vo2MaxCalculatorInteractor:", error.message);
      throw error;
    }
  };
  