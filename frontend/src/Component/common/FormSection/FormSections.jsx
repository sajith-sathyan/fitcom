import React from "react";
import "./Style.css";
import FormSection from "../../input/FormSection/FormSection";

function FormSections() {
  return (
    <div>
      <div className="form-container">
        <FormSection
          title="How tall are you?"
          inputs={["Feet", "Inches"]}
          unitChangeText="Change the unit to centimeters"
        />
        <FormSection
          title="How much do you weigh?"
          description="It's okay to estimate. You can update this later."
          inputs={["Weight (lbs)"]}
          unitChangeText="Change the unit to kilograms"
        />
        <FormSection
          title="What is your goal weight?"
          description="Don't worry, this won't affect your daily calorie goal. You can always change it later."
          inputs={["Goal Weight (lbs)"]}
        />
      </div>
    </div>
  );
}

export default FormSections;
