import express from 'express';
import { 
    CalculateBmi, 
    CalculateBmr, 
    CalculateTdee, 
    CalculateOneRepMax, 
    CalculateBodyFat, 
    CalculateLBM, 
    CalculateCalorieNeeds, 
    CalculateMacroSplit, 
    CalculateHydration, 
    CalculateIdealBodyWeight,
    CalculateWaistToHeightRatio,
    CalculateVo2Max,
    CalculateHeartRateZones,
    CalculatePregnancyCalories,
    CalculatefertilityWindow,
    CalculateCalorieBurn,
    CalculateStepToCalorie,
    CalculateProteinRequirement,
    CalculateGlycemicLoad
} from '../controllers/CalculatorRoutes.js';

const router = express.Router()
router.post('/bmi', CalculateBmi);
router.post('/bmr', CalculateBmr);
router.post('/tdee', CalculateTdee);
router.post('/onerepmax', CalculateOneRepMax);
router.post('/bodyfat', CalculateBodyFat);
router.post('/leanbodymass', CalculateLBM);
router.post('/calorie-needs', CalculateCalorieNeeds);
router.post('/macro-split', CalculateMacroSplit);
router.post('/hydration', CalculateHydration);
router.post('/ibw', CalculateIdealBodyWeight); 
router.post('/whtr', CalculateWaistToHeightRatio); 
router.post('/vo2max', CalculateVo2Max); 
router.post('/heart-rate-zones', CalculateHeartRateZones); 
router.post('/pregnancy-calories', CalculatePregnancyCalories); 
router.post('/fertility-window', CalculatefertilityWindow);
router.post('/calorie-burn', CalculateCalorieBurn); 
router.post('/step-to-calorie', CalculateStepToCalorie); 
router.post('/protein-requirement', CalculateProteinRequirement); 
router.post('/glycemic-load', CalculateGlycemicLoad); 






export default router;
