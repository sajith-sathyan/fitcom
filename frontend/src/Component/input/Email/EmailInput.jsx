import React from "react";
import "./Style.css";

function EmailInput() {
  return (
    <div className="email-container">
      <div className="email-enterarea">
        <input id="register" type="email" required className="email-input" />
        <div className="email-lebelline">Enter your email</div>
      </div>
    </div>
  );
}

export default EmailInput;
