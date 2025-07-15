export default class AIWorkoutPlan {
  constructor(
    age = null,
    currentWeight = null,
    targetWeight = null,
    goalType = null,
    experience = null,
    bodyType = null,
    diet = { isFollowing: false, detail: null },
    equipment = [],
    focusMuscles = [],
    injuries = null,
    sleepHours = null,
    trainingDays = null
  ) {
    this.age = age;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.goalType = goalType;
    this.experience = experience;
    this.bodyType = bodyType;
    this.diet = diet;
    this.equipment = equipment;
    this.focusMuscles = focusMuscles;
    this.injuries = injuries;
    this.sleepHours = sleepHours;
    this.trainingDays = trainingDays;

    this._modifiedFields = {};
  }

  setAge(age) {
    if (age === this.age) return;
    this.age = age;
    this._modifiedFields.age = true;
  }

  setCurrentWeight(currentWeight) {
    if (currentWeight === this.currentWeight) return;
    this.currentWeight = currentWeight;
    this._modifiedFields.currentWeight = true;
  }

  setTargetWeight(targetWeight) {
    if (targetWeight === this.targetWeight) return;
    this.targetWeight = targetWeight;
    this._modifiedFields.targetWeight = true;
  }

  setGoalType(goalType) {
    if (goalType === this.goalType) return;
    this.goalType = goalType;
    this._modifiedFields.goalType = true;
  }

  setExperience(experience) {
    if (experience === this.experience) return;
    this.experience = experience;
    this._modifiedFields.experience = true;
  }

  setBodyType(bodyType) {
    if (bodyType === this.bodyType) return;
    this.bodyType = bodyType;
    this._modifiedFields.bodyType = true;
  }

  setDiet(diet) {
    if (JSON.stringify(diet) === JSON.stringify(this.diet)) return;
    this.diet = diet;
    this._modifiedFields.diet = true;
  }

  setEquipment(equipment) {
    if (JSON.stringify(equipment) === JSON.stringify(this.equipment)) return;
    this.equipment = equipment;
    this._modifiedFields.equipment = true;
  }

  setFocusMuscles(focusMuscles) {
    if (JSON.stringify(focusMuscles) === JSON.stringify(this.focusMuscles)) return;
    this.focusMuscles = focusMuscles;
    this._modifiedFields.focusMuscles = true;
  }

  setInjuries(injuries) {
    if (injuries === this.injuries) return;
    this.injuries = injuries;
    this._modifiedFields.injuries = true;
  }

  setSleepHours(sleepHours) {
    if (sleepHours === this.sleepHours) return;
    this.sleepHours = sleepHours;
    this._modifiedFields.sleepHours = true;
  }

  setTrainingDays(trainingDays) {
    if (trainingDays === this.trainingDays) return;
    this.trainingDays = trainingDays;
    this._modifiedFields.trainingDays = true;
  }

  getModifiedFields() {
    return this._modifiedFields;
  }

  clearModifiedFields() {
    return (this._modifiedFields = {});
  }
}
