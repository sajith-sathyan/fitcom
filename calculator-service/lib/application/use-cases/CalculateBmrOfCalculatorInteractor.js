export default async (height, weight, forWhom, age, gender, userId, {
    calculatorsRepositories
}) => {
    console.log(height, weight, forWhom, age, gender, userId)
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

    // BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const roundedBMR = parseFloat(bmr.toFixed(2));
    const message = `Your BMR is approximately ${roundedBMR} kcal/day. This is the number of calories your body needs to maintain basic functions at rest.`;

    // Save result if "for me"
    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'BMR',
            inputData: { height, weight, age, gender },
            result: { bmr: roundedBMR },
            notes: 'BMR calculated using Mifflin-St Jeor Equation'
        });
    }


    console.log(bmr,message)

    return {
        bmr: roundedBMR,
        message,
        info: forWhom === 'me' ? "BMR saved for user." : "BMR calculated (not saved)."
    };
};
