import express from 'express';
import {suggestionsController,getNutritionController } from '../controllers/nutritionController.js';

const router = express.Router();



router.get('/suggestions',suggestionsController);
router.get('/fetchNutrition',getNutritionController);



export default router;
