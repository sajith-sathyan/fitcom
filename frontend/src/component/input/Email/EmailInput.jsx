import React, { useState } from "react";
import "./Style.css";

function EmailInput({ name, value, onChange }) {
  const [error, setError] = useState("");

  const validate = (val) => {
    if (!val) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Enter a valid email address.";
    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e);
    setError(validate(val));
  };

  return (
    <div className="email-container">
      <div className={`email-enterarea ${error ? "error-border" : ""}`}>
        <input
          type="email"
          name={name}
          value={value}
          onChange={handleChange}
          required
          className={`email-input ${error ? "input-error" : ""}`}
        />
        <div className="email-lebelline">Enter your email address</div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default EmailInput;
