import React from "react";
import "./Style.css";

function EmailInput() {
  return (
    <div>
      <div className="enterarea">
        <input id="register" type="email" required />
        <div className="lebelline">Enter your email</div>
      </div>
    </div>
  );
}

export default EmailInput;
