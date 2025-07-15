import React, { useState } from "react";
import "./Style.css";

function LastNameInput({ name, value, onChange }) {
  const [error, setError] = useState("");

  const validateLastname = (lastname) => {
    if (!lastname) {
      return "Last name is required.";
    }
    if (lastname.length < 2) {
      return "Last name must be at least 2 characters.";
    }
    if (!/^[a-zA-Z]+$/.test(lastname)) {
      return "Only letters are allowed.";
    }
    return "";
  };

  const handleChange = (e) => {
    const lastname = e.target.value;
    onChange(e); // Pass data to the parent
    const validationError = validateLastname(lastname);
    setError(validationError);
  };

  return (
    <div className="lastname-container">
      <div className={`lastname-enterarea ${error ? "error-border" : ""}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          required
          className={`lastname-input ${error ? "input-error" : ""}`}
        />
        <div className="lastname-lebelline">Enter your last name</div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default LastNameInput;
