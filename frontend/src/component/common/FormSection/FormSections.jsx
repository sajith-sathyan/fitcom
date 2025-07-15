import React, { useState, useEffect } from "react";
import "./Style.css";
import {
  fields,
  getUnits,
  initializeFormData,
  handleChange,
  handleUnitChange,
} from "./helper.js";

const FormSection = ({ onValidate }) => {
  const [formData, setFormData] = useState(initializeFormData());

  // ✅ Send formData to parent when it changes
  useEffect(() => {
    const isValid = Object.values(formData).every(
      (field) => field.value.trim() !== "" && !field.error
    );
    onValidate(formData, isValid);
  }, [formData, onValidate]);

  return (
    <div className="form-container">
      {fields.map((field, index) => (
        <div key={index} className="input-block">
          <h5>{field.title}</h5>
          <p className="input-description">{field.description}</p>
          <div className="input-group">
            <input
              type="text"
              className={`input-field ${formData[field.name].error ? "error" : ""}`}
              placeholder={field.name}
              value={formData[field.name].value}
              onChange={(e) =>
                handleChange(
                  field.name,
                  e.target.value,
                  formData,
                  setFormData,
                  onValidate
                )
              }
            />
            <select
              className="unit-select"
              value={formData[field.name].unit}
              onChange={(e) =>
                handleUnitChange(field.name, e.target.value, setFormData)
              }
            >
              {getUnits(field.name).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          {formData[field.name].error && (
            <p className="error-message">{formData[field.name].error}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormSection;
