import React, { useState } from "react";
import "./Style.css";

function FirstNameInput({ name, value, onChange }) {
  const [error, setError] = useState("");

  const validate = (val) => {
    if (!val) return "First name is required.";
    if (val.length < 3) return "Must be at least 3 characters.";
    if (!/^[a-zA-Z]+$/.test(val)) return "Only letters are allowed.";
    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(e);
    setError(validate(value));
  };

  return (
    <div className="username-container">
      <div className={`username-enterarea ${error ? "error-border" : ""}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          required
          className={`username-input ${error ? "input-error" : ""}`}
        />
        <div className="username-lebelline">Enter your first name</div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default FirstNameInput;
