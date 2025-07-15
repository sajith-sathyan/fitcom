export default async (userId, lastPeriod, cycleLength, forWhom, { calculatorsRepositories }) => {
    try {
        console.log(`User: ${userId}, Last Period: ${lastPeriod}, Cycle Length: ${cycleLength}, For Whom: ${forWhom}`);

        // Validate inputs
        if (!lastPeriod || isNaN(cycleLength) || cycleLength < 21 || cycleLength > 35) {
            throw new Error('Invalid input: Please provide a valid lastPeriod and a cycleLength between 21 and 35.');
        }

        // Calculate ovulation and fertile window
        const cycle = parseInt(cycleLength);
        const ovulationOffset = cycle - 14;

        const startDate = new Date(lastPeriod);
        const ovulationDate = new Date(startDate);
        ovulationDate.setDate(startDate.getDate() + ovulationOffset);

        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 4);

        const fertileEnd = new Date(ovulationDate);
        fertileEnd.setDate(ovulationDate.getDate() + 1);

        const result = {
            start: fertileStart.toDateString(),
            ovulation: ovulationDate.toDateString(),
            end: fertileEnd.toDateString()
        };

        // Compose message
        let message = `Your fertile window has been calculated successfully. `;
        if (forWhom === 'me') {
            message += `This information is saved to your profile to help you plan pregnancy better. `;
        } else {
            message += `Since this was calculated for someone else, it is not saved. `;
        }

        message += `Your estimated fertile window is from ${result.start} to ${result.end}, with ovulation likely on ${result.ovulation}.`;

        // Save result if forWhom === 'me'
        if (forWhom === 'me') {
            await calculatorsRepositories.persist({
                userId,
                calculationType: 'FertilityWindow',
                inputData: { lastPeriod, cycleLength },
                result,
                notes: `Fertility window calculated for user ${userId}.`,
            });

            console.log(`Fertility window saved for user ${userId}`);
        }

        return {
            start: result.start,
            ovulation: result.ovulation,
            end: result.end,
            message,
            info: forWhom === 'me' ? 'Fertile window saved to profile.' : 'Fertile window calculated (not saved).'
        };
    } catch (error) {
        console.error('Error in FertilityWindowCalculatorInteractor:', error.message);
        throw error;
    }
};
