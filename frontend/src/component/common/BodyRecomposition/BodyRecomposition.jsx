import React, { useState } from "react";
import "./Style.css";
import RadioButton from "../../button/RadioButton/RadioButton";

function BodyRecomposition() {
  const [currentBodyType, setCurrentBodyType] = useState(null);
  const [primaryGoal, setPrimaryGoal] = useState(null);
  const [weeklyTrainingDays, setWeeklyTrainingDays] = useState(null);
  const [nutritionFocus, setNutritionFocus] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const toggleSelection = (stateSetter, currentState, value) => {
    stateSetter(
      currentState.includes(value)
        ? currentState.filter((item) => item !== value)
        : [...currentState, value]
    );
  };

  const validate = () => {
    const errors = {};
    if (!currentBodyType) errors.currentBodyType = "Please select your current body type.";
    if (!primaryGoal) errors.primaryGoal = "Please select your primary goal.";
    if (!weeklyTrainingDays) errors.weeklyTrainingDays = "Please select training frequency.";
    if (nutritionFocus.length === 0) errors.nutritionFocus = "Select at least one nutrition focus.";
    if (!experienceLevel) errors.experienceLevel = "Please select your experience level.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        currentBodyType,
        primaryGoal,
        weeklyTrainingDays,
        nutritionFocus,
        experienceLevel,
      };
      console.log("Body Recomposition Data:", data);
      alert("Body Recomposition plan submitted successfully!");
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
    <div className="body-recomp-card">
      <h2>🔄 Body Recomposition</h2>
      <p>Help us understand your body and goals to create your personalized recomposition plan.</p>

      {questionCard(
        "1. What is your current body type?",
        (
          <div className="radio-button-group">
            {["Ectomorph", "Mesomorph", "Endomorph", "Combination"].map((type) => (
              <RadioButton
                key={type}
                name="currentBodyType"
                value={type}
                label={type}
                checked={currentBodyType === type}
                onChange={(e) => setCurrentBodyType(e.target.value)}
              />
            ))}
          </div>
        ),
        "currentBodyType"
      )}

      {questionCard(
        "2. What is your primary goal?",
        (
          <div className="radio-button-group">
            {[
              "Lose fat, gain muscle",
              "Gain muscle, maintain fat",
              "Maintain muscle, lose fat",
              "Improve overall fitness",
            ].map((goal) => (
              <RadioButton
                key={goal}
                name="primaryGoal"
                value={goal}
                label={goal}
                checked={primaryGoal === goal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
              />
            ))}
          </div>
        ),
        "primaryGoal"
      )}

      {questionCard(
        "3. How many days per week can you train?",
        (
          <div className="radio-button-group">
            {["1-2 days", "3-4 days", "5-6 days", "Daily"].map((days) => (
              <RadioButton
                key={days}
                name="weeklyTrainingDays"
                value={days}
                label={days}
                checked={weeklyTrainingDays === days}
                onChange={(e) => setWeeklyTrainingDays(e.target.value)}
              />
            ))}
          </div>
        ),
        "weeklyTrainingDays"
      )}

      {questionCard(
        "4. What is your nutrition focus?",
        (
          <div className="radio-button-group">
            {[
              "High protein",
              "Calorie deficit",
              "Balanced macros",
              "Intermittent fasting",
              "Flexible dieting",
            ].map((nutrition) => (
              <RadioButton
                key={nutrition}
                name={nutrition}
                value={nutrition}
                label={nutrition}
                checked={nutritionFocus.includes(nutrition)}
                onChange={() => toggleSelection(setNutritionFocus, nutritionFocus, nutrition)}
              />
            ))}
          </div>
        ),
        "nutritionFocus"
      )}

      {questionCard(
        "5. What is your training experience level?",
        (
          <div className="radio-button-group">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <RadioButton
                key={level}
                name="experienceLevel"
                value={level}
                label={level}
                checked={experienceLevel === level}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
            ))}
          </div>
        ),
        "experienceLevel"
      )}

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Body Recomposition Plan
        </button>
      </div>
    </div>
  );
}

export default BodyRecomposition;
