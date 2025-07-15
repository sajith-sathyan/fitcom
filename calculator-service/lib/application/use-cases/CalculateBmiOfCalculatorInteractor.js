export default async (userId, height, weight, forWhom, age, gender, {
    calculatorsRepositories
}) => {
    // Validate input
    if (!height || !weight || !age || !gender) {
        throw new Error("Height, weight, age, and gender are required");
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

    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters ** 2);
    const roundedBMI = parseFloat(bmi.toFixed(2));

    // Determine BMI category and personalized message
    let status = '';
    let bmiMessage = '';

    if (roundedBMI < 18.5) {
        status = 'Underweight';
        bmiMessage = `You're underweight for your height. At age ${age}, ${gender === 'male' ? 'men' : 'women'} in this range may need to increase calorie intake and muscle mass. A nutritionist can help with a tailored plan.`;
    } else if (roundedBMI >= 18.5 && roundedBMI < 24.9) {
        status = 'Normal weight';
        bmiMessage = `Great! Your BMI is in the healthy range. Keep up your current routine with balanced meals and regular activity suitable for your age (${age}).`;
    } else if (roundedBMI >= 25 && roundedBMI < 29.9) {
        status = 'Overweight';
        bmiMessage = `You are slightly overweight. This may increase your risk for conditions like blood pressure or cholesterol, especially for your age (${age}). Consider adjusting diet or exercise.`;
    } else {
        status = 'Obese';
        bmiMessage = `Your BMI is in the obese range. This can affect long-term health, particularly at age ${age}. It's strongly advised to consult a healthcare provider for personalized guidance.`;
    }

    // Save result if "for me"
    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'BMI',
            inputData: { height, weight, age, gender },
            result: { bmi: roundedBMI, status },
            notes: 'BMI calculated with age and gender context'
        });
    }

    return {
        bmi: roundedBMI,
        bmiMessage,
        status,
        message: forWhom === 'me' ? "BMI saved for user." : "BMI calculated (not saved)."
    };
};
