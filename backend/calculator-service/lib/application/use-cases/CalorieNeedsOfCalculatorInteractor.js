export default async (
    age, weight, height, gender, activityLevel, forWhom, unit,userId ,{
        calculatorsRepositories }
) => {
    // Input validation
    if (!age || !weight || !height || !gender || !activityLevel) {
        throw new Error("All fields (age, weight, height, gender, activity level) are required.");
    }

    if (typeof age !== 'number' || age < 1 || age > 120) {
        throw new Error("Age must be a number between 1 and 120.");
    }

    if (typeof height !== 'number' || height < 50 || height > 272) {
        throw new Error("Height must be a number between 50 cm and 272 cm.");
    }

    if (typeof weight !== 'number' || weight < 2 || weight > 635) {
        throw new Error("Weight must be a number between 2 kg and 635 kg.");
    }

    if (!['male', 'female'].includes(gender)) {
        throw new Error("Gender must be 'male' or 'female'.");
    }

    const multiplier = parseFloat(activityLevel);
    if (isNaN(multiplier) || multiplier < 1.2 || multiplier > 1.9) {
        throw new Error("Activity level must be a number between 1.2 and 1.9.");
    }

    // BMR Calculation (Mifflin-St Jeor Equation)
    const bmr = gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = parseFloat((bmr * multiplier).toFixed(2));

    let message;
    if (multiplier <= 1.2) {
        message = "Your lifestyle is mostly sedentary. Consider adding light activity to stay healthy.";
    } else if (multiplier <= 1.55) {
        message = "You have a balanced level of activity. Maintain this for overall health and energy.";
    } else {
        message = "You are highly active! Ensure your diet supports your energy needs.";
    }

    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'TDEE',
            inputData: { age, weight, height, gender, activityLevel, unit },
            result: { tdee },
            notes: 'TDEE calculated using Mifflin-St Jeor Equation',
        });
    }
    console.log(tdee, message)
    return {
        calorieNeed: tdee,
        message,
        info: forWhom === 'me' ? "Calorie needs saved." : "Calorie needs calculated (not saved).",
    };

}
