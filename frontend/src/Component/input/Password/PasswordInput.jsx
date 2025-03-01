import React from "react";
import "./Style.css";

function PasswordInput() {
  return (
    <div className="password-container">
      <div className="password-enterarea">
        <input type="password" required className="password-input" />
        <div className="password-lebelline">Enter your password</div>
      </div>
    </div>
  );
}

export default PasswordInput;
