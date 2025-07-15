export default async (
    age, weight, height, gender, forWhom, activityLevel, userId,
    { calculatorsRepositories

    }) => {
    // Validation
    if (!height || !weight || !age || !gender || !activityLevel) {
        throw new Error("Height, weight, age, gender, and activity level are required");
    }

    if (height < 50 || height > 272) {
        throw new Error("Height should be between 50 cm and 272 cm");
    }

    if (weight < 2 || weight > 635) {
        throw new Error("Weight should be between 2 kg and 635 kg");
    }

    if (age < 1 || age > 120) {
        throw new Error("Age should be between 1 and 120");
    }

    if (!['male', 'female'].includes(gender)) {
        throw new Error("Gender must be 'male' or 'female'");
    }

    const activityMultiplier = parseFloat(activityLevel);
    if (isNaN(activityMultiplier) || activityMultiplier < 1.2 || activityMultiplier > 1.9) {
        throw new Error("Invalid activity level");
    }

    // Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityMultiplier;
    const roundedTdee = parseFloat(tdee.toFixed(2));

    let message;
    if (activityMultiplier <= 1.2) {
        message = "Your lifestyle is mostly sedentary. Consider adding light activity to stay healthy.";
    } else if (activityMultiplier <= 1.55) {
        message = "You have a balanced level of activity. Maintain this for overall health and energy.";
    } else {
        message = "You are highly active! Ensure your diet supports your energy needs.";
    }

    // Save result if for self
    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'TDEE',
            inputData: { height, weight, age, gender, activityLevel },
            result: { tdee: roundedTdee },
            notes: 'TDEE calculated using BMR and activity level'
        });
    }

    console.log(tdee,message)
    return {
        tdee: roundedTdee,
        message,
        info: forWhom === 'me' ? "TDEE saved for user." : "TDEE calculated (not saved)."
    };
};
