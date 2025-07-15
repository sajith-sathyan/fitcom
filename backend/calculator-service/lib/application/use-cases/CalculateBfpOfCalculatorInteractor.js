export default async (
    userId, gender, waist, neck, height, forWhom,
    { calculatorsRepositories }
) => {
    // Convert cm to inches (if the units are in cm as per the data)
    const waistInch = waist / 2.54;
    const neckInch = neck / 2.54;
    const heightInch = height / 2.54;

    // Validate inputs (ensure positive values)
    if (waistInch <= 0 || neckInch <= 0 || heightInch <= 0) {
        throw new Error("Height, waist, and neck must be positive values.");
    }

    let bfp;

    // For males, calculate BFP using waist and neck measurements
    if (gender === 'male') {
        // Ensure waist is greater than neck (logarithm validation)
        if (waistInch <= neckInch) {
            throw new Error("Waist circumference must be greater than neck circumference.");
        }

        // BFP formula for males
        bfp = 86.010 * Math.log10(waistInch - neckInch) - 70.041 * Math.log10(heightInch) + 36.76;
    } else {
        // For females, we would need to add hip measurement (not included in your sample data)
        // If hip is provided, use it for female BFP calculation
        const hipInch = req.body.hip / 2.54; // Assuming hip measurement is provided
        if (waistInch + hipInch <= neckInch) {
            throw new Error("Waist + Hip must be greater than Neck for females.");
        }

        // BFP formula for females (if hip is provided)
        bfp = 163.205 * Math.log10(waistInch + hipInch - neckInch) - 97.684 * Math.log10(heightInch) - 78.387;
    }

    // Round to 2 decimal places
    const roundedBfp = +bfp.toFixed(2);

    // If forWhom is "me", save the result to the database
    if (forWhom === "me") {
        await calculatorsRepositories.persist({
            userId,
            calculationType: 'BodyFat',
            inputData: { heightInch, waistInch, neckInch, gender },
            result: { bfp: roundedBfp},
            notes: 'bfp calculated with age and gender context'


        });
    }

    // Return the result with a message and info
    return {
        bfp: roundedBfp,
        message: "Body Fat Percentage calculated successfully.",
        info: forWhom === 'me' ? "BFP saved to user profile." : "BFP calculated but not saved."
    };
};
