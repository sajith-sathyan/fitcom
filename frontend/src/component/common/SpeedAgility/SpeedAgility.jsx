import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function SpeedAgility() {
  const [currentSpeed, setCurrentSpeed] = useState(null);
  const [trainingFocus, setTrainingFocus] = useState([]);
  const [sportType, setSportType] = useState(null);
  const [agilityLevel, setAgilityLevel] = useState(null);
  const [trainingFrequency, setTrainingFrequency] = useState(null);
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const toggleSelection = (stateSetter, currentState, value) => {
    stateSetter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const validate = () => {
    const errors = {};
    if (!currentSpeed) errors.currentSpeed = "Please select your current speed level.";
    if (trainingFocus.length === 0) errors.trainingFocus = "Select at least one training goal.";
    if (!sportType) errors.sportType = "Please select a sport type.";
    if (!agilityLevel) errors.agilityLevel = "Select your agility level.";
    if (!trainingFrequency) errors.trainingFrequency = "Please choose training frequency.";
    if (availableEquipment.length === 0) errors.availableEquipment = "Select available equipment.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        currentSpeed,
        trainingFocus,
        sportType,
        agilityLevel,
        trainingFrequency,
        availableEquipment,
      };
      console.log("Speed & Agility Data:", data);
      alert("Speed & Agility plan submitted successfully!");
    }
  };

  const questionCard = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  return (
    <div className="speed-agility-card">
      <h2>⚡ Speed & Agility</h2>
      <p>Answer these questions to personalize your speed and agility program.</p>

      {questionCard("1. How would you rate your current speed?", (
        <div className="radio-button-group">
          {["Slow", "Average", "Fast", "Elite"].map((level) => (
            <RadioButton
              key={level}
              name="currentSpeed"
              value={level}
              label={level}
              checked={currentSpeed === level}
              onChange={(e) => setCurrentSpeed(e.target.value)}
            />
          ))}
        </div>
      ), "currentSpeed")}

      {questionCard("2. What are your training goals?", (
        <div className="radio-button-group">
          {["Improve sprinting", "Enhance footwork", "Quick direction changes", "Overall agility"].map((goal) => (
            <RadioButton
              key={goal}
              name={goal}
              value={goal}
              label={goal}
              checked={trainingFocus.includes(goal)}
              onChange={() => toggleSelection(setTrainingFocus, trainingFocus, goal)}
            />
          ))}
        </div>
      ), "trainingFocus")}

      {questionCard("3. Do you play any sport?", (
        <div className="radio-button-group">
          {["No", "Football", "Basketball", "Badminton", "Tennis", "Martial Arts"].map((sport) => (
            <RadioButton
              key={sport}
              name="sportType"
              value={sport}
              label={sport}
              checked={sportType === sport}
              onChange={(e) => setSportType(e.target.value)}
            />
          ))}
        </div>
      ), "sportType")}

      {questionCard("4. Rate your agility level:", (
        <div className="radio-button-group">
          {["Low", "Moderate", "High"].map((agility) => (
            <RadioButton
              key={agility}
              name="agilityLevel"
              value={agility}
              label={agility}
              checked={agilityLevel === agility}
              onChange={(e) => setAgilityLevel(e.target.value)}
            />
          ))}
        </div>
      ), "agilityLevel")}

      {questionCard("5. How many times can you train per week?", (
        <div className="radio-button-group">
          {["1-2 times", "3-4 times", "5-6 times", "Daily"].map((freq) => (
            <RadioButton
              key={freq}
              name="trainingFrequency"
              value={freq}
              label={freq}
              checked={trainingFrequency === freq}
              onChange={(e) => setTrainingFrequency(e.target.value)}
            />
          ))}
        </div>
      ), "trainingFrequency")}

      {questionCard("6. What equipment do you have access to?", (
        <div className="radio-button-group">
          {["None", "Agility Ladder", "Cones", "Resistance Bands", "Speed Parachute", "Gym"].map((equipment) => (
            <RadioButton
              key={equipment}
              name={equipment}
              value={equipment}
              label={equipment}
              checked={availableEquipment.includes(equipment)}
              onChange={() => toggleSelection(setAvailableEquipment, availableEquipment, equipment)}
            />
          ))}
        </div>
      ), "availableEquipment")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Speed & Agility Plan
        </button>
      </div>
    </div>
  );
}

export default SpeedAgility;
