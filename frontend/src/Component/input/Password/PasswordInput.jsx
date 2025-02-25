import React from "react";
import "./Style.css";

function PasswordInput() {
  return (
    <div>
      <div id="register" className="enterarea">
        <input type="password" required />
        <div className="lebelline">Enter your password</div>
      </div>
    </div>
  );
}

export default PasswordInput;
