import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
});

export const userService = '/user-service'
export const calculatorService = '/calculator-service'
export const aiService  = '/ai-service'
export const NutritionService = '/nutrition-service'
export const WorkoutService = '/workout-service'

export const googleAuth = (code) => api.get(`/oauth-google?code=${code}`);