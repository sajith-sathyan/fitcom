// Use Cases (Business Logic) 
import BmiOfCalculatorInteractor from "../../application/use-cases/CalculateBmiOfCalculatorInteractor.js";
import BmrOfCalculatorInteractor from "../../application/use-cases/CalculateBmrOfCalculatorInteractor.js";
import TdeeOfCalculatorInteractor from "../../application/use-cases/CalculateTdeeOfCalculatorInteractor.js";
import OneRepMaxOfCalculatorInteractor from "../../application/use-cases/CalculateOneRepMaxOfCalculatorInteractor.js";
import BfpOfCalculatorInteractor from "../../application/use-cases/CalculateBfpOfCalculatorInteractor.js";
import LeanBodyMassOfCalculatorInteractor from "../../application/use-cases/LeanBodyMassOfCalculatorInteractor.js";
import CalorieNeedsOfCalculatorInteractor from "../../application/use-cases/CalorieNeedsOfCalculatorInteractor.js";
import MacroSplitOfCalculatorInteractor from "../../application/use-cases/MacroSplitOfCalculatorInteractor.js";
import HydrationOfCalculatorInteractor from "../../application/use-cases/HydrationOfCalculatorInteractor.js";
import IbwOfCalculatorInteractor from "../../application/use-cases/IbwOfCalculatorInteractor.js";
import WhtrOfCalculatorInteractor from "../../application/use-cases/WhtrOfCalculatorInteractor.js";
import Vo2MaxOfCalculatorInteractor from "../../application/use-cases/Vo2MaxOfCalculatorInteractor.js";
import HrzOfCalculatorInteractor from "../../application/use-cases/HrzOfCalculatorInteractor.js";
import PregnancyCaloriesOfCalculatorInteractor from "../../application/use-cases/PregnancyCaloriesOfCalculatorInteractor.js";
import fertilityWindowOfCalculatorInteractor from "../../application/use-cases/fertilityWindowOfCalculatorInteractor.js";
import CalorieBurnOfCalculatorInteractor from "../../application/use-cases/CalorieBurnOfCalculatorInteractor.js"; 
import StepToCalorieOfCalculatorInteractor from "../../application/use-cases/StepToCalorieOfCalculatorInteractor.js"; CalculateGlycemicLoad
import ProteinRequirementOfCalculatorInteractor from "../../application/use-cases/ProteinRequirementOfCalculatorInteractor.js";
import GlycemicLoadOfCalculatorInteractor from "../../application/use-cases/GlycemicLoadOfCalculatorInteractor.js";



// Repositories (Database Abstraction)
import CalculatorsRepositories from "../../infrastructure/repositories/calculatorsRepositories.js";



const calculatorsRepositories = new CalculatorsRepositories();



export async function CalculateBmi(req, res) {
    const { height, weight, forWhom, userId, age, gender } = req.body
    console.log(req.body)

    try {
        const result = await BmiOfCalculatorInteractor(userId, height, weight, forWhom, age, gender, {
            calculatorsRepositories: calculatorsRepositories
        })
        res.status(200).json({
            bmi: result.bmi,
            bmiMessage: result.bmiMessage,
            message: result.message,
            status: result.status
        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }

}

export async function CalculateBmr(req, res) {
    const { height, weight, forWhom, age, gender, userId } = req.body
    try {
        const result = await BmrOfCalculatorInteractor(height, weight, forWhom, age, gender, userId, {
            calculatorsRepositories: calculatorsRepositories
        })

        res.status(200).json({
            bmr: result.bmr,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculateTdee(req, res) {
    const { age, weight, height, gender, forWhom, activityLevel, userId } = req.body
    try {
        const result = await TdeeOfCalculatorInteractor(age, weight, height, gender, forWhom, activityLevel, userId, {
            calculatorsRepositories: calculatorsRepositories
        })
        res.status(200).json({
            tdee: result.tdee,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

export async function CalculateOneRepMax(req, res) {
    const { weight, reps, forWhom, userId } = req.body

    try {
        const result = await OneRepMaxOfCalculatorInteractor(weight, reps, forWhom, userId, {
            calculatorsRepositories: calculatorsRepositories
        })
        console.log(result)

        res.status(200).json({
            oneRepMax: result.roundedOneRepMax,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculateBodyFat(req, res) {
    const { userId, gender, waist, neck, height, forWhom } = req.body
    try {
        const result = await BfpOfCalculatorInteractor(userId, gender, waist, neck, height, forWhom, {
            calculatorsRepositories: calculatorsRepositories
        })
        res.status(200).json({
            bfp: result.bfp,
            message: result.message,
            info: result.info
        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}


export async function CalculateLBM(req, res) {
    console.log(req.body)
    const { userId, gender, weight, height, forWhom, unit } = req.body

    try {
        const result = await LeanBodyMassOfCalculatorInteractor(userId, gender, weight, height, forWhom, unit,
            { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            lbm: result.lbm,
            message: result.message,
            info: result.info

        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculateCalorieNeeds(req, res) {
    const { age, weight, height, gender, activityLevel, forWhom, unit, userId } = req.body
    try {
        const result = await CalorieNeedsOfCalculatorInteractor(age, weight, height, gender, activityLevel, forWhom, unit, userId,
            { calculatorsRepositories: calculatorsRepositories })


        res.status(200).json({
            calorieNeed: result.calorieNeed,
            message: result.message,
            info: result.info

        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculateMacroSplit(req, res) {


    try {
        const { calories,
            proteinPercentage,
            carbsPercentage,
            fatsPercentage,
            forWhom,
            userId } = req.body

        const result = await MacroSplitOfCalculatorInteractor(
            userId,
            calories,
            proteinPercentage,
            carbsPercentage,
            fatsPercentage,
            forWhom,
            { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            proteinGrams: result.proteinGrams,
            carbsGrams: result.carbsGrams,
            fatsGrams: result.fatsGrams,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }

}

export async function CalculateHydration(req, res) {

    const { weight, forWhom, userId } = req.body
    try {
        const result = await HydrationOfCalculatorInteractor(weight, forWhom, userId, { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            hydration: result.hydration,
            message: result.message,
            info: result.info,

        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }

}


export async function CalculateIdealBodyWeight(req, res) {
    const { height, gender, forWhom, userId } = req.body
    try {

        const result = await IbwOfCalculatorInteractor(height, gender, forWhom, userId, { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            ibw: result.idealWeight,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }

}

export async function CalculateWaistToHeightRatio(req, res) {
    const { userId, waist, height, forWhom } = req.body
    try {
        const result = await WhtrOfCalculatorInteractor(userId, waist, height, forWhom, { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            whtr: result.whtr,
            category: result.category,
            message: result.message,
            info: result.info
        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

export async function CalculateVo2Max(req, res) {
    const { age, weight, time, heartRate, gender, forWhom, userId } = req.body

    try {
        const result = await Vo2MaxOfCalculatorInteractor(age, weight, time, heartRate, gender, forWhom, userId, { calculatorsRepositories: calculatorsRepositories })
        console.log(result)
        res.status(200).json({
            vo2Max: result.vo2Max,
            message: result.message,
            info: result.info
        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }

}

export async function CalculateHeartRateZones(req, res) {
    const { age, restingHeartRate, forWhom, userId } = req.body
    try {

        const result = await HrzOfCalculatorInteractor(age, restingHeartRate, forWhom, userId, { calculatorsRepositories: calculatorsRepositories })
        res.status(200).json({
            zones: result.zones,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

export async function CalculatePregnancyCalories(req, res) {
    const { age, height, weight, activityLevel, trimester, userId, forWhom, unit } = req.body
    try {

        const result = await PregnancyCaloriesOfCalculatorInteractor(age, height, weight, activityLevel, trimester, userId, forWhom, unit , { calculatorsRepositories: calculatorsRepositories })
        console.log(result)
        res.status(200).json({
            calorieNeed: result.calorieNeed,
            message: result.message,
            info: result.info
        });

    } catch (err) {
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculatefertilityWindow(req,res) {
   const {lastPeriod,cycleLength,userId,forWhom} = req.body
   try{

    const result = await fertilityWindowOfCalculatorInteractor(userId, lastPeriod, cycleLength, forWhom,{ calculatorsRepositories: calculatorsRepositories})
    res.status(200).json({
        start:result.start,
        ovulation:result.ovulation,
        end:result.end,
        message: result.message,
        info: result.info
    });

   }catch(err){
    res.status(500).json({ error: err.message || 'Internal server error' });

   }
}

export async function CalculateCalorieBurn(req,res) {
    const {weight,duration,activity,userId,forWhom,unit}= req.body

    try{
        const result = await CalorieBurnOfCalculatorInteractor(weight,duration,activity,userId,forWhom,unit,{ calculatorsRepositories: calculatorsRepositories})
        res.status(200).json({
            calories:result.calories,
            message: result.message,
            info: result.info
        });
    }catch(err){
        res.status(500).json({ error: err.message || 'Internal server error' });
 
    }
}

export async function CalculateStepToCalorie(req,res) {
    const {steps,weight,userId,forWhom} = req.body

    try{
        const result = await StepToCalorieOfCalculatorInteractor(steps,weight,userId,forWhom,{ calculatorsRepositories: calculatorsRepositories})

        res.status(200).json({
            calories:result.calories,
            message: result.message,
            info: result.info
        });

    }catch(err){
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

export async function CalculateProteinRequirement(req,res) {
    console.log(req.body)
    const {weight,activityLevel,userId,forWhom} = req.body
    try{

        const result =await ProteinRequirementOfCalculatorInteractor(weight,activityLevel,userId,forWhom,{ calculatorsRepositories: calculatorsRepositories})
        res.status(200).json({
            proteinNeed:result.proteinNeed,
            message: result.message,
            info: result.info
        });
    }catch(err){
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}

export async function CalculateGlycemicLoad(req,res) {
    console.log(req.body)
    const {gi,carbs,userId,forWhom} = req.body

    try{

        const result = await GlycemicLoadOfCalculatorInteractor(gi,carbs,userId,forWhom,{ calculatorsRepositories: calculatorsRepositories})
        res.status(200).json({
            glycemicLoad:result.glycemicLoad,
            message: result.message,
            info: result.info
        });
    }catch(err){
        res.status(500).json({ error: err.message || 'Internal server error' });

    }
}