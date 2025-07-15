"use strict";

import IWorkoutRepository from "../../domain/repositories/IWorkoutRepository.js";
import AIWorkoutPlan from "../../domain/entities/AIWorkoutPlan.js";
import AIWorkoutPlanModel from "../database/models/AIWorkoutPlan.Model.js";

export default class extends IWorkoutRepository {
  // Persist the workout plan
  async persist(workoutPlanEntity) {
    const {
      age,
      currentWeight,
      targetWeight,
      goalType,
      experience,
      bodyType,
      diet,
      equipment,
      focusMuscles,
      injuries,
      sleepHours,
      trainingDays,
      workoutPlan,
    } = workoutPlanEntity;

    const mongooseWorkoutPlan = new AIWorkoutPlanModel({
      age,
      currentWeight,
      targetWeight,
      goalType,
      experience,
      bodyType,
      diet,
      equipment,
      focusMuscles,
      injuries,
      sleepHours,
      trainingDays,
      workoutPlan,
    });

    await mongooseWorkoutPlan.save();
    return mapToWorkoutPlanEntity(mongooseWorkoutPlan);
  }

  // Merge the workout plan with updates
  async merge(workoutPlanEntity) {
    const modifiedFields = workoutPlanEntity.getModifiedFields();
    if (Object.keys(modifiedFields).length === 0) {
      return; // No modifications to update
    }

    const updateFields = {};
    for (const field in modifiedFields) {
      if (modifiedFields[field]) {
        updateFields[field] = workoutPlanEntity[field];
      }
    }

    console.log("updateFields", updateFields);

    await AIWorkoutPlanModel.findByIdAndUpdate(workoutPlanEntity.id, updateFields);

    workoutPlanEntity.clearModifiedFields();
    return true;
  }

  // Remove a workout plan by ID
  async remove(workoutPlanId) {
    const doc = await AIWorkoutPlanModel.findOneAndDelete({ _id: workoutPlanId });
    return !!doc;
  }

  // Find a workout plan by ID
  async findById(workoutPlanId) {
    const mongooseWorkoutPlan = await AIWorkoutPlanModel.findById(workoutPlanId);
    return mapToWorkoutPlanEntity(mongooseWorkoutPlan);
  }

  // Find a workout plan by user ID (you may adjust this if needed)
  async findByUserId(userId) {
    const mongooseWorkoutPlan = await AIWorkoutPlanModel.findOne({ userId: userId });
    return mapToWorkoutPlanEntity(mongooseWorkoutPlan);
  }

  // Fetch all workout plans
  async find() {
    const mongooseWorkoutPlans = await AIWorkoutPlanModel.find();
    return mongooseWorkoutPlans.map((mongooseWorkoutPlan) => {
      return mapToWorkoutPlanEntity(mongooseWorkoutPlan);
    });
  }
}

// Function to map Mongoose Workout Plan document to a domain entity
function mapToWorkoutPlanEntity(mongooseWorkoutPlan) {
  if (!mongooseWorkoutPlan) {
    return null;
  }

  const workoutPlan = new AIWorkoutPlan(
    mongooseWorkoutPlan._id,
    mongooseWorkoutPlan.age,
    mongooseWorkoutPlan.currentWeight,
    mongooseWorkoutPlan.targetWeight,
    mongooseWorkoutPlan.goalType,
    mongooseWorkoutPlan.experience,
    mongooseWorkoutPlan.bodyType,
    mongooseWorkoutPlan.diet,
    mongooseWorkoutPlan.equipment,
    mongooseWorkoutPlan.focusMuscles,
    mongooseWorkoutPlan.injuries,
    mongooseWorkoutPlan.sleepHours,
    mongooseWorkoutPlan.trainingDays,
    mongooseWorkoutPlan.workoutPlan,
  );

  return workoutPlan;
}
