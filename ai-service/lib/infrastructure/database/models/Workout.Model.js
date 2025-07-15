import mongoose from "mongoose";

// Define the AIWorkoutPlan Schema
const AIWorkoutPlanSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  targetWeight: {
    type: Number,
    required: true,
  },
  goalType: {
    type: String,
    required: true,
    enum: ["Recomposition", "Fat Loss", "Muscle Gain", "Maintenance"],  // You can adjust this list based on the goal types you expect
  },
  experience: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],  // Assuming these categories
  },
  bodyType: {
    type: String,
    required: true,
    enum: ["Ectomorph", "Mesomorph", "Endomorph"],  // Body types you expect
  },
  diet: {
    isFollowing: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: String,
      default: null,
    },
  },
  equipment: {
    type: [String],
    required: true,
    default: [],
  },
  focusMuscles: {
    type: [String],
    required: true,
    default: [],
  },
  injuries: {
    type: String,
    default: null,
  },
  sleepHours: {
    type: String,
    required: true,
  },
  trainingDays: {
    type: Number,
    required: true,
  },
  workoutPlan: {
    type: Object,  // This will store the AI-generated workout plan in JSON format
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AIWorkoutPlanModel = mongoose.model("AIWorkoutPlan", AIWorkoutPlanSchema);

export default AIWorkoutPlanModel;
