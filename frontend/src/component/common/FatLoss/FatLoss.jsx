import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function FatLoss() {
  const [age, setAge] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [goalType, setGoalType] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedCardio, setSelectedCardio] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [bodyType, setBodyType] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [injuryDetail, setInjuryDetail] = useState("");
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [dietDetail, setDietDetail] = useState("");
  const [activityLevel, setActivityLevel] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const questionBlock = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  const toggleCardio = (type) => {
    setSelectedCardio((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const toggleFocus = (area) => {
    setSelectedFocus((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  };

  const getUserData = () => ({
    age,
    currentWeight,
    targetWeight,
    goalType,
    experience: selectedExperience,
    trainingDays: selectedDays,
    cardioTypes: selectedCardio,
    focusAreas: selectedFocus,
    bodyType,
    sleepHours,
    activityLevel,
    injuries: injuryDetail,
    diet: {
      isFollowing: selectedDiet === "Yes",
      detail: selectedDiet === "Yes" ? dietDetail : null,
    },
  });

  const validateInputs = () => {
    const errors = {};
    if (!age || age <= 0) errors.age = "Please enter a valid age.";
    if (!currentWeight || currentWeight <= 0) errors.currentWeight = "Enter your current weight.";
    if (!targetWeight || targetWeight <= 0) errors.targetWeight = "Enter your target weight.";
    if (!goalType) errors.goalType = "Please select a goal.";
    if (!selectedExperience) errors.experience = "Select your training experience.";
    if (!selectedDays) errors.days = "Select training days per week.";
    if (selectedCardio.length === 0) errors.cardio = "Select at least one cardio type.";
    if (selectedFocus.length === 0) errors.focus = "Select at least one area to focus on.";
    if (!bodyType) errors.bodyType = "Select your body type.";
    if (!sleepHours) errors.sleep = "Select your sleep duration.";
    if (!activityLevel) errors.activityLevel = "Choose your activity level.";
    if (selectedDiet === "Yes" && !dietDetail) errors.dietDetail = "Provide your diet details.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const data = getUserData();
      console.log("Fat Loss Plan:", data);
      alert("Fat loss plan submitted successfully!");
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="fat-loss-card">
      <h2>🔥 Fat Loss</h2>
      <p>
        Want to shed fat and get lean? Let’s build a custom fat-loss plan that suits your lifestyle.
        Answer a few questions to get started!
      </p>

      {questionBlock("Age", (
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" className="input-field" />
      ), "age")}

      {questionBlock("Current Weight (kg)", (
        <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} placeholder="Enter your current weight" className="input-field" />
      ), "currentWeight")}

      {questionBlock("Target Weight (kg)", (
        <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} placeholder="Enter your target weight" className="input-field" />
      ), "targetWeight")}

      {questionBlock("1. What is your primary fitness goal?", (
        <div className="radio-button-group">
          {["Fat Loss", "Recomposition", "Tone Up", "Improve Endurance"].map((goal) => (
            <RadioButton key={goal} name="goal" value={goal} label={goal} checked={goalType === goal} onChange={(e) => setGoalType(e.target.value)} />
          ))}
        </div>
      ), "goalType")}

      {questionBlock("2. What is your training experience?", (
        <div className="radio-button-group">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <RadioButton key={level} name="experience" value={level} label={level} checked={selectedExperience === level} onChange={(e) => setSelectedExperience(e.target.value)} />
          ))}
        </div>
      ), "experience")}

      {questionBlock("3. How many days per week can you train?", (
        <div className="radio-button-group">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <RadioButton key={day} name="days" value={String(day)} label={`${day} day${day > 1 ? "s" : ""}`} checked={selectedDays === String(day)} onChange={(e) => setSelectedDays(e.target.value)} />
          ))}
        </div>
      ), "days")}

      {questionBlock("4. What type of cardio do you prefer?", (
        <div className="radio-button-group">
          {["Running", "Cycling", "Walking", "HIIT", "Swimming"].map((type) => (
            <RadioButton key={type} name={type} value={type} label={type} checked={selectedCardio.includes(type)} onChange={() => toggleCardio(type)} />
          ))}
        </div>
      ), "cardio")}

      {questionBlock("5. Which areas do you want to focus on?", (
        <div className="radio-button-group">
          {["Abs", "Thighs", "Arms", "Chest", "Full Body"].map((area) => (
            <RadioButton key={area} name={area} value={area} label={area} checked={selectedFocus.includes(area)} onChange={() => toggleFocus(area)} />
          ))}
        </div>
      ), "focus")}

      {questionBlock("6. What is your body type?", (
        <div className="radio-button-group">
          {["Ectomorph", "Mesomorph", "Endomorph"].map((type) => (
            <RadioButton key={type} name="bodytype" value={type} label={type} checked={bodyType === type} onChange={(e) => setBodyType(e.target.value)} />
          ))}
        </div>
      ), "bodyType")}

      {questionBlock("7. How many hours of sleep do you get daily?", (
        <div className="radio-button-group">
          {["<5", "5-6", "7-8", "8+"].map((hour) => (
            <RadioButton key={hour} name="sleep" value={hour} label={`${hour} hrs`} checked={sleepHours === hour} onChange={(e) => setSleepHours(e.target.value)} />
          ))}
        </div>
      ), "sleep")}

      {questionBlock("8. How active is your daily lifestyle?", (
        <div className="radio-button-group">
          {["Sedentary", "Lightly Active", "Moderately Active", "Very Active"].map((level) => (
            <RadioButton key={level} name="activity" value={level} label={level} checked={activityLevel === level} onChange={(e) => setActivityLevel(e.target.value)} />
          ))}
        </div>
      ), "activityLevel")}

      {questionBlock("9. Do you have any injuries or limitations?", (
        <input type="text" value={injuryDetail} onChange={(e) => setInjuryDetail(e.target.value)} placeholder="e.g., Knee pain, Back injury" className="input-field" />
      ))}

      {questionBlock("10. Are you following any specific diet?", (
        <>
          <div className="radio-button-group">
            {["Yes", "No"].map((option) => (
              <RadioButton key={option} name="diet" value={option} label={option} checked={selectedDiet === option} onChange={(e) => setSelectedDiet(e.target.value)} />
            ))}
          </div>
          {selectedDiet === "Yes" && (
            <input type="text" placeholder="e.g., Intermittent Fasting, Low-Carb" value={dietDetail} onChange={(e) => setDietDetail(e.target.value)} className="input-field" />
          )}
        </>
      ), "dietDetail")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Fat Loss Plan
        </button>
      </div>
    </div>
  );
}

export default FatLoss;
