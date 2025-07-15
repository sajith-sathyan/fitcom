import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function BoostEndurance() {
  const [age, setAge] = useState("");
  const [currentFitness, setCurrentFitness] = useState("");
  const [enduranceGoal, setEnduranceGoal] = useState("");
  const [experience, setExperience] = useState(null);
  const [weeklyTrainingDays, setWeeklyTrainingDays] = useState(null);
  const [cardioPreference, setCardioPreference] = useState([]);
  const [focusArea, setFocusArea] = useState([]);
  const [bodyType, setBodyType] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [diet, setDiet] = useState(null);
  const [dietDetails, setDietDetails] = useState("");
  const [injuryDetails, setInjuryDetails] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const toggleCardio = (type) => {
    setCardioPreference((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleFocus = (area) => {
    setFocusArea((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const questionBlock = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  const validateInputs = () => {
    const errors = {};
    if (!age || age <= 0) errors.age = "Enter a valid age.";
    if (!currentFitness) errors.currentFitness = "Describe your current fitness.";
    if (!enduranceGoal) errors.enduranceGoal = "Enter your endurance goal.";
    if (!experience) errors.experience = "Select experience level.";
    if (!weeklyTrainingDays) errors.trainingDays = "Select training days.";
    if (cardioPreference.length === 0) errors.cardio = "Select cardio preferences.";
    if (focusArea.length === 0) errors.focus = "Select focus area.";
    if (!bodyType) errors.bodyType = "Choose body type.";
    if (!activityLevel) errors.activity = "Select activity level.";
    if (!sleepHours) errors.sleep = "Select sleep duration.";
    if (diet === "Yes" && !dietDetails) errors.dietDetails = "Provide diet details.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const data = {
        age,
        currentFitness,
        enduranceGoal,
        experience,
        weeklyTrainingDays,
        cardioPreference,
        focusArea,
        bodyType,
        activityLevel,
        sleepHours,
        diet: diet === "Yes" ? dietDetails : "Not following",
        injuryDetails,
      };
      console.log("Endurance Plan:", data);
      alert("Boost Endurance plan submitted successfully!");
    }
  };

  return (
    <div className="fat-loss-card">
      <h2>🏃 Boost Endurance</h2>
      <p>
        Want to improve your stamina and endurance? Let’s build a plan to help you push your limits.
      </p>

      {questionBlock("Age", (
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" className="input-field" />
      ), "age")}

      {questionBlock("Current Fitness Level", (
        <input type="text" value={currentFitness} onChange={(e) => setCurrentFitness(e.target.value)} placeholder="e.g., Beginner, Runner" className="input-field" />
      ), "currentFitness")}

      {questionBlock("Endurance Goal", (
        <input type="text" value={enduranceGoal} onChange={(e) => setEnduranceGoal(e.target.value)} placeholder="e.g., Run 10km, Improve VO2 max" className="input-field" />
      ), "enduranceGoal")}

      {questionBlock("Training Experience", (
        <div className="radio-button-group">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <RadioButton key={level} name="experience" value={level} label={level} checked={experience === level} onChange={(e) => setExperience(e.target.value)} />
          ))}
        </div>
      ), "experience")}

      {questionBlock("Training Days Per Week", (
        <div className="radio-button-group">
          {[1,2,3,4,5,6,7].map((day) => (
            <RadioButton key={day} name="days" value={String(day)} label={`${day} day${day > 1 ? "s" : ""}`} checked={weeklyTrainingDays === String(day)} onChange={(e) => setWeeklyTrainingDays(e.target.value)} />
          ))}
        </div>
      ), "trainingDays")}

      {questionBlock("Cardio Preferences", (
        <div className="radio-button-group">
          {["Running", "Cycling", "Swimming", "HIIT", "Rowing"].map((type) => (
            <RadioButton key={type} name={type} value={type} label={type} checked={cardioPreference.includes(type)} onChange={() => toggleCardio(type)} />
          ))}
        </div>
      ), "cardio")}

      {questionBlock("Focus Area", (
        <div className="radio-button-group">
          {["Lungs", "Legs", "Heart Health", "Overall Stamina"].map((area) => (
            <RadioButton key={area} name={area} value={area} label={area} checked={focusArea.includes(area)} onChange={() => toggleFocus(area)} />
          ))}
        </div>
      ), "focus")}

      {questionBlock("Body Type", (
        <div className="radio-button-group">
          {["Ectomorph", "Mesomorph", "Endomorph"].map((type) => (
            <RadioButton key={type} name="bodyType" value={type} label={type} checked={bodyType === type} onChange={(e) => setBodyType(e.target.value)} />
          ))}
        </div>
      ), "bodyType")}

      {questionBlock("Activity Level", (
        <div className="radio-button-group">
          {["Sedentary", "Lightly Active", "Moderately Active", "Very Active"].map((level) => (
            <RadioButton key={level} name="activityLevel" value={level} label={level} checked={activityLevel === level} onChange={(e) => setActivityLevel(e.target.value)} />
          ))}
        </div>
      ), "activity")}

      {questionBlock("Sleep Hours", (
        <div className="radio-button-group">
          {["<5", "5-6", "7-8", "8+"].map((hour) => (
            <RadioButton key={hour} name="sleepHours" value={hour} label={`${hour} hrs`} checked={sleepHours === hour} onChange={(e) => setSleepHours(e.target.value)} />
          ))}
        </div>
      ), "sleep")}

      {questionBlock("Any Injuries or Limitations?", (
        <input type="text" value={injuryDetails} onChange={(e) => setInjuryDetails(e.target.value)} placeholder="e.g., Knee pain, Back injury" className="input-field" />
      ))}

      {questionBlock("Are You Following Any Specific Diet?", (
        <>
          <div className="radio-button-group">
            {["Yes", "No"].map((option) => (
              <RadioButton key={option} name="diet" value={option} label={option} checked={diet === option} onChange={(e) => setDiet(e.target.value)} />
            ))}
          </div>
          {diet === "Yes" && (
            <input type="text" value={dietDetails} onChange={(e) => setDietDetails(e.target.value)} placeholder="e.g., Vegan, Paleo" className="input-field" />
          )}
        </>
      ), "dietDetails")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>Submit Endurance Plan</button>
      </div>
    </div>
  );
}

export default BoostEndurance;