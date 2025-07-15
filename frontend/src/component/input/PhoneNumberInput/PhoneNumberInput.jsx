import React, { useState } from "react";
import "./Style.css";

function PhoneNumberInput({ name, value, onChange }) {
  const [error, setError] = useState("");

  const validate = (val) => {
    if (!val) return "Phone number is required.";
    if (!/^[0-9]{10}$/.test(val)) return "Enter a valid 10-digit phone number.";
    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e);
    setError(validate(val));
  };

  return (
    <div className="username-container">
      <div className={`username-enterarea ${error ? "error-border" : ""}`}>
        <input
          type="tel"
          name={name}
          value={value}
          onChange={handleChange}
          required
          maxLength="10"
          className={`username-input ${error ? "input-error" : ""}`}
        />
        <div className="username-lebelline">Enter your phone number</div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default PhoneNumberInput;
