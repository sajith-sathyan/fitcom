import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function BuildMuscle() {
  const [age, setAge] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalType, setGoalType] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [bodyType, setBodyType] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [injuryDetail, setInjuryDetail] = useState("");
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [dietDetail, setDietDetail] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const questionBlock = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  const toggleEquipment = (equipment) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        : [...prev, equipment]
    );
  };

  const toggleFocus = (muscle) => {
    setSelectedFocus((prev) =>
      prev.includes(muscle)
        ? prev.filter((item) => item !== muscle)
        : [...prev, muscle]
    );
  };

  const getUserData = () => {
    return {
      age,
      currentWeight,
      targetWeight,
      goalType,
      experience: selectedExperience,
      trainingDays: selectedDays,
      equipment: selectedEquipment,
      focusMuscles: selectedFocus,
      bodyType,
      sleepHours,
      injuries: injuryDetail,
      diet: {
        isFollowing: selectedDiet === "Yes",
        detail: selectedDiet === "Yes" ? dietDetail : null,
      },
    };
  };

  const validateInputs = () => {
    const errors = {};

    if (!age || age <= 0) errors.age = "Please enter a valid age.";
    if (!currentWeight || currentWeight <= 0) errors.currentWeight = "Enter your current weight.";
    if (!targetWeight || targetWeight <= 0) errors.targetWeight = "Enter your target weight.";
    if (!goalType) errors.goalType = "Please select a goal.";
    if (!selectedExperience) errors.experience = "Select your training experience.";
    if (!selectedDays) errors.days = "Select training days per week.";
    if (selectedEquipment.length === 0) errors.equipment = "Choose at least one equipment.";
    if (selectedFocus.length === 0) errors.focus = "Choose at least one muscle group.";
    if (!bodyType) errors.bodyType = "Please select your body type.";
    if (!sleepHours) errors.sleep = "Select your average sleep duration.";
    if (selectedDiet === "Yes" && !dietDetail) errors.dietDetail = "Please provide your diet details.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const data = getUserData();
      console.log("User Data:", data);
      alert("Plan submitted successfully!");
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="build-muscle-card">
      <h2>🏋️ Build Muscle</h2>
      <p>
        Ready to get stronger and bulk up? Let’s create a personalized plan just for you!
        Answer a few quick questions to tailor your muscle-building journey.
      </p>

      {questionBlock("Age", (
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input-field"
        />
      ), "age")}

      {questionBlock("Current Weight (kg)", (
        <input
          type="number"
          placeholder="Enter your current weight"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          className="input-field"
        />
      ), "currentWeight")}

      {questionBlock("Target Weight (kg)", (
        <input
          type="number"
          placeholder="Enter your target weight"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          className="input-field"
        />
      ), "targetWeight")}

      {questionBlock("1. What is your primary fitness goal?", (
        <div className="radio-button-group">
          {["Build Muscle", "Recomposition", "Strength", "Fat Loss"].map((goal) => (
            <RadioButton
              key={goal}
              name="goal"
              value={goal}
              label={goal}
              checked={goalType === goal}
              onChange={(e) => setGoalType(e.target.value)}
            />
          ))}
        </div>
      ), "goalType")}

      {questionBlock("2. What is your current training experience?", (
        <div className="radio-button-group">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <RadioButton
              key={level}
              name="experience"
              value={level}
              label={level}
              checked={selectedExperience === level}
              onChange={(e) => setSelectedExperience(e.target.value)}
            />
          ))}
        </div>
      ), "experience")}

      {questionBlock("3. How many days per week can you train?", (
        <div className="radio-button-group">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <RadioButton
              key={day}
              name="days"
              value={String(day)}
              label={`${day} day${day > 1 ? "s" : ""}`}
              checked={selectedDays === String(day)}
              onChange={(e) => setSelectedDays(e.target.value)}
            />
          ))}
        </div>
      ), "days")}

      {questionBlock("4. Which equipment do you have access to?", (
        <div className="radio-button-group">
          {["Dumbbells", "Barbell", "Gym", "Bodyweight only"].map((equipment) => (
            <RadioButton
              key={equipment}
              name={equipment}
              value={equipment}
              label={equipment}
              checked={selectedEquipment.includes(equipment)}
              onChange={() => toggleEquipment(equipment)}
            />
          ))}
        </div>
      ), "equipment")}

      {questionBlock("5. Which muscle groups would you like to focus on more?", (
        <div className="radio-button-group">
          {["Chest", "Back", "Arms", "Legs", "Shoulders"].map((muscle) => (
            <RadioButton
              key={muscle}
              name={muscle}
              value={muscle}
              label={muscle}
              checked={selectedFocus.includes(muscle)}
              onChange={() => toggleFocus(muscle)}
            />
          ))}
        </div>
      ), "focus")}

      {questionBlock("6. What is your body type?", (
        <div className="radio-button-group">
          {["Ectomorph", "Mesomorph", "Endomorph"].map((type) => (
            <RadioButton
              key={type}
              name="bodytype"
              value={type}
              label={type}
              checked={bodyType === type}
              onChange={(e) => setBodyType(e.target.value)}
            />
          ))}
        </div>
      ), "bodyType")}

      {questionBlock("7. How many hours of sleep do you get daily?", (
        <div className="radio-button-group">
          {["<5", "5-6", "7-8", "8+"].map((hour) => (
            <RadioButton
              key={hour}
              name="sleep"
              value={hour}
              label={`${hour} hrs`}
              checked={sleepHours === hour}
              onChange={(e) => setSleepHours(e.target.value)}
            />
          ))}
        </div>
      ), "sleep")}

      {questionBlock("8. Do you have any injuries or limitations?", (
        <input
          type="text"
          placeholder="e.g., Knee pain, Shoulder issues"
          value={injuryDetail}
          onChange={(e) => setInjuryDetail(e.target.value)}
          className="input-field"
        />
      ))}

      {questionBlock("9. Are you following any specific diet or calorie surplus?", (
        <>
          <div className="radio-button-group">
            {["Yes", "No"].map((option) => (
              <RadioButton
                key={option}
                name="diet"
                value={option}
                label={option}
                checked={selectedDiet === option}
                onChange={(e) => setSelectedDiet(e.target.value)}
              />
            ))}
          </div>
          {selectedDiet === "Yes" && (
            <input
              type="text"
              placeholder="e.g., Keto, High-Protein, Vegan"
              value={dietDetail}
              onChange={(e) => setDietDetail(e.target.value)}
              className="input-field"
            />
          )}
        </>
      ), "dietDetail")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Plan
        </button>
      </div>
    </div>
  );
}

export default BuildMuscle;
