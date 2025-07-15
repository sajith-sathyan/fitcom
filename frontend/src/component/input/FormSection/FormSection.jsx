import React, { useState } from "react";
import "./Style.css";

const FormSection = ({ title, description, inputs, onValidate }) => {
  const weightUnits = ["lbs", "kg", "stone", "grams", "ounces"];
  const heightUnits = ["cm", "meters", "feet", "inches"];

  // Determine default unit based on input name
  const getDefaultUnit = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("height") || lowerInput.includes("tall")) {
      return "cm"; // Default height unit
    } else if (lowerInput.includes("weight") || lowerInput.includes("mass")) {
      return "kg"; // Default weight unit
    }
    return ""; // Default empty if not recognized
  };

  const getUnits = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("height") || lowerInput.includes("tall")) {
      return heightUnits;
    } else if (lowerInput.includes("weight") || lowerInput.includes("mass")) {
      return weightUnits;
    }
    return [];
  };

  const [values, setValues] = useState(inputs.map(() => ""));
  const [errors, setErrors] = useState(inputs.map(() => ""));
  const [showUnits, setShowUnits] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(
    inputs.map((input) => getDefaultUnit(input))
  );

  // Validation function
  const validateField = (value) => {
    if (!value.trim()) {
      return "This field is required";
    } else if (isNaN(value) || Number(value) <= 0) {
      return "Please enter a valid number";
    }
    return "";
  };

  // Handle input change
  const handleChange = (index, event) => {
    const newValue = event.target.value;
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    const newErrors = [...errors];
    newErrors[index] = validateField(newValue);
    setErrors(newErrors);

    onValidate(
      newValues.map((val, i) => ({ value: val, unit: selectedUnit[i] })),
      newErrors.every((error) => error === "")
    );
  };

  // Handle unit selection
  const handleUnitSelect = (index, unit) => {
    const newUnits = [...selectedUnit];
    newUnits[index] = unit;
    setSelectedUnit(newUnits);
    setShowUnits(null);
  };

  return (
    <div>
      <div className="text-container">
        <h5>{title}</h5>
        {description && <p>{description}</p>}
      </div>

      <div className="input-container">
        {inputs.map((placeholder, index) => (
          <div key={index} className="input-block">
            <div className="input-group">
              <input
                type="text"
                placeholder={placeholder}
                className={`input-field ${errors[index] ? "error" : ""}`}
                value={values[index]}
                onChange={(e) => handleChange(index, e)}
              />
              <span
                className="unit-label"
                onClick={() => setShowUnits(showUnits === index ? null : index)}
              >
                {selectedUnit[index]}
              </span>
            </div>
            {errors[index] && (
              <span className="error-text">{errors[index]}</span>
            )}
            {showUnits === index && (
              <div className="unit-options">
                {getUnits(placeholder).map((unit, i) => (
                  <span
                    key={i}
                    className="unit-option"
                    onClick={() => handleUnitSelect(index, unit)}
                  >
                    {unit}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSection;
