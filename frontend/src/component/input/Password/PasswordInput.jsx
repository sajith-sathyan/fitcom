import React, { useState } from "react";
import "./Style.css";

function PasswordInput({ name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const isValid = value.length >= 8; // Validate password length

  return (
    <div >
      <div className="password-enterarea">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={`password-input ${!isValid && value ? "invalid" : ""}`} 
        />
        {!value && <label className="password-lebelline">Enter your password</label>}
        
        {/* 👁️ Show/Hide Password Button */}
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility"
        >
  {showPassword ? "🙉" : "🙈"} 
  </button>
      </div>

      {/* Show error message if password is too short */}
      {!isValid && value && <p className="error-message">Password must be at least 8 characters long</p>}
    </div>
  );
} 

export default PasswordInput;
