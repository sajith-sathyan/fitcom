export default async (weight, reps, forWhom, userId, { calculatorsRepositories }) => {
    // Validate input
    if (!weight || !reps) {
        throw new Error("Weight and reps are required.");
    }

    if (weight <= 0 || weight > 635) {
        throw new Error("Weight should be between 1 kg and 635 kg.");
    }

    if (reps <= 0 || reps > 100) {
        throw new Error("Reps should be between 1 and 100.");
    }

    // Epley Formula: 1RM = weight * (1 + 0.0333 * reps)
    const oneRepMax = weight * (1 + 0.0333 * reps);
    const roundedOneRepMax = parseFloat(oneRepMax.toFixed(2));

    const message = `Your estimated 1-rep max is ${roundedOneRepMax} kg using the Epley formula.`;

    // Save result if "for me"
    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'OneRepMax',
            inputData: { weight, reps },
            result: { oneRepMax: roundedOneRepMax },
            notes: '1RM calculated using Epley formula'
        });
    }

    return {
        oneRepMax: roundedOneRepMax,
        message,
        info: forWhom === 'me' ? "1RM saved for user." : "1RM calculated (not saved)."
    };
};
