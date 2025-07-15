export default async (
    weight, duration, activity, userId, forWhom, unit,
    { calculatorsRepositories }
) => {
    try {
        // --------- Validation ---------
        if (weight <= 0) throw new Error("Weight must be a positive number.");
        if (duration <= 0) throw new Error("Duration must be a positive number.");
        if (!activity) throw new Error("Activity type is required.");
        if (!['me', 'someoneElse'].includes(forWhom)) throw new Error("Invalid 'forWhom' value.");

        // --------- MET Values Based on Activity ---------
        const MET_VALUES = {
            walking: 3.5,
            running: 9.8,
            cycling: 7.5,
            swimming: 8.0,
            yoga: 2.5,
            weightlifting: 6.0,
            aerobics: 7.3
        };

        const met = MET_VALUES[activity];
        if (!met) throw new Error("Unsupported activity type.");

        // --------- Calories Burned Calculation ---------
        // Formula: Calories = MET × weight (kg) × duration (hr)
        const durationInHours = duration / 60;
        const calories = parseFloat((met * weight * durationInHours).toFixed(2));

        let message = `Estimated Calories Burned: ${calories} kcal for ${activity}.`;

        // --------- Save to Database if for 'me' ---------
        if (forWhom === 'me') {
            await calculatorsRepositories.persist({
                userId,
                calculationType: 'CalorieBurn',
                inputData: {
                    weight,
                    duration,
                    activity,
                    unit
                },
                result: {
                    calories
                },
                notes: `Calorie burn estimated and saved for user ${userId}.`
            });
            message += ' This result has been saved to your profile.';
        } else {
            message += ' This result is calculated for someone else (not saved).';
        }

        return {
            calories,
            message,
            info: forWhom === 'me' ? 'Saved to your profile.' : 'Not saved (external use).'
        };

    } catch (error) {
        console.error("Error in CalorieBurnCalculatorInteractor:", error.message);
        throw error;
    }
};
