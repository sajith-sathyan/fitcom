export default async (
    age,
    restingHeartRate,
    forWhom,
    userId,
    { calculatorsRepositories }
) => {
    // Input validation
    if (!age || !restingHeartRate) {
        throw new Error("Age and resting heart rate are required.");
    }

    if (typeof age !== 'number' || age < 1 || age > 120) {
        throw new Error("Age must be a number between 1 and 120.");
    }

    if (typeof restingHeartRate !== 'number' || restingHeartRate < 30 || restingHeartRate > 150) {
        throw new Error("Resting heart rate must be between 30 and 150 bpm.");
    }

    // Heart rate max formula
    const maxHR = 220 - age;

    // Karvonen Formula: Target Heart Rate = ((Max HR - Resting HR) × %Intensity) + Resting HR
    const zonePercentages = [
        { label: "Zone 1 (Very Light)", min: 50, max: 60 },
        { label: "Zone 2 (Light)", min: 60, max: 70 },
        { label: "Zone 3 (Moderate)", min: 70, max: 80 },
        { label: "Zone 4 (Hard)", min: 80, max: 90 },
        { label: "Zone 5 (Maximum)", min: 90, max: 100 },
    ];

    const zones = zonePercentages.map(zone => {
        const bpmMin = Math.round(((maxHR - restingHeartRate) * (zone.min / 100)) + restingHeartRate);
        const bpmMax = Math.round(((maxHR - restingHeartRate) * (zone.max / 100)) + restingHeartRate);

        return {
            label: zone.label,
            bpmMin,
            bpmMax,
        };
    });

    let message = "Your personalized heart rate zones are calculated based on your age and resting heart rate.";
    let info = "Zones are useful for targeted cardio training.";

    if (forWhom === 'me') {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'HeartRateZones',
            inputData: { age, restingHeartRate },
            result: { zones },
            notes: 'Heart Rate Zones calculated using Karvonen Formula',
        });

        info = "Heart rate zones saved.";
    } else {
        info = "Heart rate zones calculated (not saved).";
    }

    return {
        zones,
        message,
        info,
    };
};
