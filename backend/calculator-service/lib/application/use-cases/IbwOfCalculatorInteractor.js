export default async (
    height,
    gender,
    forWhom,
    userId,
    {
        calculatorsRepositories
    }
) => {
    try {
        // Input validation
        if (!height || !gender) {
            throw new Error("Both height and gender are required.");
        }

        if (typeof height !== 'number' || height < 50 || height > 272) {
            throw new Error("Height must be a number between 50 cm and 272 cm.");
        }

        if (!['male', 'female'].includes(gender)) {
            throw new Error("Gender must be 'male' or 'female'.");
        }

        // Devine Formula (in cm)
        // Ideal Weight (kg) = 50 + 0.9 * (height in cm - 152.4) for males
        // Ideal Weight (kg) = 45.5 + 0.9 * (height in cm - 152.4) for females
        const base = gender === 'male' ? 50 : 45.5;
        const idealWeight = parseFloat((base + 0.9 * (height - 152.4)).toFixed(2));

        // Optional message
        let message;
        if (idealWeight < 50) {
            message = "This is a low estimate. Make sure you're not underweight.";
        } else if (idealWeight > 80) {
            message = "You have a higher natural frame. Focus on maintaining healthy lean mass.";
        } else {
            message = "Your ideal weight is in a healthy range.";
        }

        // Save result if for self
        if (forWhom === 'me') {
            await calculatorsRepositories.persist({
                userId,
                calculationType: 'IdealBodyWeight',
                inputData: { height, gender },
                result: { idealWeight },
                notes: 'Ideal Body Weight calculated using Devine Formula',
            });
        }
        return {
            idealWeight,
            message,
            info: forWhom === 'me' ? "Ideal body weight saved." : "Ideal body weight calculated (not saved).",
        };

    } catch (error) {
        console.error("Error in IdealBodyWeightOfCalculatorInteractor:", error.message);
        throw error;
    }
};
