import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function FlexibilityMobility() {
  const [age, setAge] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [experience, setExperience] = useState(null);
  const [trainingDays, setTrainingDays] = useState(null);
  const [injuries, setInjuries] = useState("");
  const [stretchTypes, setStretchTypes] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const toggleOption = (value, setter, current) => {
    setter(current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    );
  };

  const validate = () => {
    const errors = {};
    if (!age || age <= 0) errors.age = "Enter a valid age.";
    if (!experience) errors.experience = "Select your experience level.";
    if (!trainingDays) errors.trainingDays = "Select training days.";
    if (focusAreas.length === 0) errors.focusAreas = "Choose at least one focus area.";
    if (stretchTypes.length === 0) errors.stretchTypes = "Choose at least one stretch type.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        age,
        experience,
        trainingDays,
        focusAreas,
        stretchTypes,
        injuries,
      };
      console.log("Flexibility & Mobility Plan:", data);
      alert("Flexibility & Mobility plan submitted successfully!");
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
    <div className="flexibility-card">
      <h2>🧘 Flexibility & Mobility</h2>
      <p>Improve your flexibility and joint mobility with a personalized routine. Let’s understand your needs first.</p>

      {questionBlock("Age", (
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" className="input-field" />
      ), "age")}

      {questionBlock("1. What's your experience level with stretching or mobility work?", (
        <div className="radio-button-group">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <RadioButton key={level} name="experience" value={level} label={level} checked={experience === level} onChange={(e) => setExperience(e.target.value)} />
          ))}
        </div>
      ), "experience")}

      {questionBlock("2. How many days per week can you dedicate to flexibility training?", (
        <div className="radio-button-group">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <RadioButton key={day} name="days" value={String(day)} label={`${day} day${day > 1 ? "s" : ""}`} checked={trainingDays === String(day)} onChange={(e) => setTrainingDays(e.target.value)} />
          ))}
        </div>
      ), "trainingDays")}

      {questionBlock("3. What areas do you want to improve flexibility in?", (
        <div className="radio-button-group">
          {["Hamstrings", "Back", "Shoulders", "Hips", "Full Body"].map((area) => (
            <RadioButton key={area} name={area} value={area} label={area} checked={focusAreas.includes(area)} onChange={() => toggleOption(area, setFocusAreas, focusAreas)} />
          ))}
        </div>
      ), "focusAreas")}

      {questionBlock("4. What types of stretching do you prefer?", (
        <div className="radio-button-group">
          {["Static", "Dynamic", "PNF", "Yoga", "Foam Rolling"].map((type) => (
            <RadioButton key={type} name={type} value={type} label={type} checked={stretchTypes.includes(type)} onChange={() => toggleOption(type, setStretchTypes, stretchTypes)} />
          ))}
        </div>
      ), "stretchTypes")}

      {questionBlock("5. Do you have any injuries or joint limitations?", (
        <input type="text" value={injuries} onChange={(e) => setInjuries(e.target.value)} placeholder="e.g., Shoulder pain, knee issue" className="input-field" />
      ))}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Flexibility Plan
        </button>
      </div>
    </div>
  );
}

export default FlexibilityMobility;
