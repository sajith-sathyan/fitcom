// LeanBodyMassOfCalculatorInteractor.js

export default async (userId, gender, weight, height, forWhom, unit, { calculatorsRepositories }) => {
    try {
        // Log the input values for debugging
        console.log(`User: ${userId}, Gender: ${gender}, Weight: ${weight}, Height: ${height}, For Whom: ${forWhom}, Unit: ${unit}`);

        // Perform LBM calculation based on gender
        let lbm;
        if (gender === 'male') {
            lbm = 0.407 * weight + 0.267 * height - 19.2;
        } else if (gender === 'female') {
            lbm = 0.252 * weight + 0.473 * height - 48.3;
        } else {
            throw new Error('Invalid gender provided.');
        }

        // Round the result to 2 decimal places
        lbm = lbm.toFixed(2);

        // Prepare a full message based on the gender and calculation
        let fullMessage = `Your Lean Body Mass (LBM) has been successfully calculated. `;

        if (forWhom === 'me') {
            fullMessage += `This result will be saved to your profile to personalize your future workout and diet plans. `;
        } else {
            fullMessage += `This result has been calculated for someone else. It will not be saved. `;
        }

        fullMessage += `LBM Calculation Formula: `;
        fullMessage += gender === 'male' ? `0.407 * weight + 0.267 * height - 19.2` : `0.252 * weight + 0.473 * height - 48.3`;
        fullMessage += `. Your calculated LBM is ${lbm} kg.`;

        // If the calculation is for the user (forWhom === 'me'), save it to the database
        if (forWhom === 'me') {
            // Use calculatorsRepositories to save the result to the database
            await calculatorsRepositories.persist(
                {
                    userId,
                    calculationType: 'LeanBodyMass',
                    inputData: { weight, height, gender, unit },
                    result: { lbm },
                    notes: `Lean Body Mass calculated for user with ID: ${userId}.`,
                }
            );

            // Log the database save action
            console.log(`LBM for user ${userId} saved: ${lbm} kg`);
        }

        // Return the LBM, message, and additional info
        return {
            lbm,
            message: fullMessage,
            info: forWhom === 'me' ? "LBM has been saved to your profile." : "LBM calculated (not saved)."
        };
    } catch (error) {
        console.error("Error in LeanBodyMassOfCalculatorInteractor:", error.message);
        throw error;
    }
}
