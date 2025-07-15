import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function ExplosiveStrength() {
  const [trainingExperience, setTrainingExperience] = useState(null);
  const [sportsType, setSportsType] = useState(null);
  const [lowerBodyFocus, setLowerBodyFocus] = useState(null);
  const [explosiveGoals, setExplosiveGoals] = useState([]);
  const [plyometricComfort, setPlyometricComfort] = useState(null);
  const [equipmentAccess, setEquipmentAccess] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const toggleGoal = (goal) => {
    setExplosiveGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const toggleEquipment = (equip) => {
    setEquipmentAccess((prev) =>
      prev.includes(equip) ? prev.filter((e) => e !== equip) : [...prev, equip]
    );
  };

  const validate = () => {
    const errors = {};
    if (!trainingExperience) errors.trainingExperience = "Please select your experience level.";
    if (!sportsType) errors.sportsType = "Select your sport or activity type.";
    if (!lowerBodyFocus) errors.lowerBodyFocus = "Choose lower-body focus level.";
    if (explosiveGoals.length === 0) errors.explosiveGoals = "Select at least one goal.";
    if (!plyometricComfort) errors.plyometricComfort = "Indicate your comfort with plyometrics.";
    if (equipmentAccess.length === 0) errors.equipmentAccess = "Select available equipment.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        trainingExperience,
        sportsType,
        lowerBodyFocus,
        explosiveGoals,
        plyometricComfort,
        equipmentAccess,
      };
      console.log("Explosive Strength Data:", data);
      alert("Explosive strength plan submitted successfully!");
    }
  };

  const questionBlock = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  return (
    <div className="explosive-strength-card">
      <h2>💥 Explosive Strength</h2>
      <p>Answer a few questions to customize your explosive power training program.</p>

      {questionBlock("1. What is your current strength training experience?", (
        <div className="radio-button-group">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <RadioButton
              key={level}
              name="trainingExperience"
              value={level}
              label={level}
              checked={trainingExperience === level}
              onChange={(e) => setTrainingExperience(e.target.value)}
            />
          ))}
        </div>
      ), "trainingExperience")}

      {questionBlock("2. Do you play any explosive sports or activities?", (
        <div className="radio-button-group">
          {["No", "Track & Field", "Basketball", "Football", "Martial Arts", "CrossFit"].map((type) => (
            <RadioButton
              key={type}
              name="sportsType"
              value={type}
              label={type}
              checked={sportsType === type}
              onChange={(e) => setSportsType(e.target.value)}
            />
          ))}
        </div>
      ), "sportsType")}

      {questionBlock("3. How important is lower-body explosiveness to you?", (
        <div className="radio-button-group">
          {["Not Important", "Moderate", "Very Important"].map((option) => (
            <RadioButton
              key={option}
              name="lowerBodyFocus"
              value={option}
              label={option}
              checked={lowerBodyFocus === option}
              onChange={(e) => setLowerBodyFocus(e.target.value)}
            />
          ))}
        </div>
      ), "lowerBodyFocus")}

      {questionBlock("4. What are your explosive strength goals?", (
        <div className="radio-button-group">
          {["Improve Vertical Jump", "Faster Sprinting", "More Power in Punch/Kick", "General Explosiveness"].map((goal) => (
            <RadioButton
              key={goal}
              name={goal}
              value={goal}
              label={goal}
              checked={explosiveGoals.includes(goal)}
              onChange={() => toggleGoal(goal)}
            />
          ))}
        </div>
      ), "explosiveGoals")}

      {questionBlock("5. Are you comfortable doing plyometric (jumping) exercises?", (
        <div className="radio-button-group">
          {["Yes", "Somewhat", "No"].map((answer) => (
            <RadioButton
              key={answer}
              name="plyometricComfort"
              value={answer}
              label={answer}
              checked={plyometricComfort === answer}
              onChange={(e) => setPlyometricComfort(e.target.value)}
            />
          ))}
        </div>
      ), "plyometricComfort")}

      {questionBlock("6. What equipment do you have access to?", (
        <div className="radio-button-group">
          {["None", "Dumbbells", "Barbell", "Resistance Bands", "Plyo Box", "Gym"].map((equip) => (
            <RadioButton
              key={equip}
              name={equip}
              value={equip}
              label={equip}
              checked={equipmentAccess.includes(equip)}
              onChange={() => toggleEquipment(equip)}
            />
          ))}
        </div>
      ), "equipmentAccess")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Explosive Strength Plan
        </button>
      </div>
    </div>
  );
}

export default ExplosiveStrength;
