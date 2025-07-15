import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function MentalWellness() {
  const [stressLevel, setStressLevel] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [mindfulnessPractices, setMindfulnessPractices] = useState([]);
  const [anxietySymptoms, setAnxietySymptoms] = useState(null);
  const [mentalGoals, setMentalGoals] = useState([]);
  const [therapyExperience, setTherapyExperience] = useState(null);
  const [supportSystem, setSupportSystem] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const toggleMindfulnessPractice = (practice) => {
    setMindfulnessPractices((prev) =>
      prev.includes(practice) ? prev.filter((item) => item !== practice) : [...prev, practice]
    );
  };

  const toggleMentalGoals = (goal) => {
    setMentalGoals((prev) =>
      prev.includes(goal) ? prev.filter((item) => item !== goal) : [...prev, goal]
    );
  };

  const questionBlock = (title, children, errorKey) => (
    <div className="question-card">
      <h4>{title}</h4>
      {children}
      {formErrors[errorKey] && <p className="error">{formErrors[errorKey]}</p>}
    </div>
  );

  const validate = () => {
    const errors = {};
    if (!stressLevel) errors.stressLevel = "Please select your stress level.";
    if (!sleepQuality) errors.sleepQuality = "Please select your sleep quality.";
    if (mindfulnessPractices.length === 0) errors.mindfulness = "Choose at least one practice.";
    if (!anxietySymptoms) errors.anxietySymptoms = "Please select a symptom level.";
    if (mentalGoals.length === 0) errors.mentalGoals = "Select at least one mental goal.";
    if (!therapyExperience) errors.therapyExperience = "Please indicate therapy experience.";
    if (!supportSystem) errors.supportSystem = "Please choose support system availability.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        stressLevel,
        sleepQuality,
        mindfulnessPractices,
        anxietySymptoms,
        mentalGoals,
        therapyExperience,
        supportSystem,
      };
      console.log("Mental Wellness Data:", data);
      alert("Mental wellness plan submitted successfully!");
    }
  };

  return (
    <div className="mental-wellness-card">
      <h2>🧠 Mental Wellness</h2>
      <p>Let’s understand your mental wellness to guide you toward a balanced and peaceful life.</p>

      {questionBlock("1. How stressed do you feel on average?", (
        <div className="radio-button-group">
          {["Low", "Moderate", "High", "Very High"].map((level) => (
            <RadioButton key={level} name="stress" value={level} label={level} checked={stressLevel === level} onChange={(e) => setStressLevel(e.target.value)} />
          ))}
        </div>
      ), "stressLevel")}

      {questionBlock("2. How would you rate your sleep quality?", (
        <div className="radio-button-group">
          {["Poor", "Average", "Good", "Excellent"].map((quality) => (
            <RadioButton key={quality} name="sleep" value={quality} label={quality} checked={sleepQuality === quality} onChange={(e) => setSleepQuality(e.target.value)} />
          ))}
        </div>
      ), "sleepQuality")}

      {questionBlock("3. Which mindfulness practices do you currently follow?", (
        <div className="radio-button-group">
          {["Meditation", "Breathing Exercises", "Yoga", "Journaling", "None"].map((practice) => (
            <RadioButton key={practice} name={practice} value={practice} label={practice} checked={mindfulnessPractices.includes(practice)} onChange={() => toggleMindfulnessPractice(practice)} />
          ))}
        </div>
      ), "mindfulness")}

      {questionBlock("4. Do you experience anxiety or mood swings frequently?", (
        <div className="radio-button-group">
          {["No", "Sometimes", "Often", "Always"].map((response) => (
            <RadioButton key={response} name="anxiety" value={response} label={response} checked={anxietySymptoms === response} onChange={(e) => setAnxietySymptoms(e.target.value)} />
          ))}
        </div>
      ), "anxietySymptoms")}

      {questionBlock("5. What are your mental wellness goals?", (
        <div className="radio-button-group">
          {["Improve Focus", "Reduce Stress", "Better Sleep", "Boost Mood", "Emotional Stability"].map((goal) => (
            <RadioButton key={goal} name={goal} value={goal} label={goal} checked={mentalGoals.includes(goal)} onChange={() => toggleMentalGoals(goal)} />
          ))}
        </div>
      ), "mentalGoals")}

      {questionBlock("6. Have you ever consulted a therapist or counselor?", (
        <div className="radio-button-group">
          {["Yes", "No"].map((option) => (
            <RadioButton key={option} name="therapy" value={option} label={option} checked={therapyExperience === option} onChange={(e) => setTherapyExperience(e.target.value)} />
          ))}
        </div>
      ), "therapyExperience")}

      {questionBlock("7. Do you have a support system (family/friends)?", (
        <div className="radio-button-group">
          {["Yes", "No", "Not Sure"].map((option) => (
            <RadioButton key={option} name="support" value={option} label={option} checked={supportSystem === option} onChange={(e) => setSupportSystem(e.target.value)} />
          ))}
        </div>
      ), "supportSystem")}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Mental Wellness Plan
        </button>
      </div>
    </div>
  );
}

export default MentalWellness;
