import React from "react";
import "./RadioButton.css"; // Import CSS for the radio button

function RadioButton({ name, value, label, checked, onChange }) {
  return (
    <label className="radio-container">
      <input
        className="custom-radio-input" // ✅ added class
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio-label">{label}</span>
    </label>
  );
}

export default RadioButton;
