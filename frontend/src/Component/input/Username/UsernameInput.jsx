import React from "react";
import "./Style.css";

function UsernameInput() {
  return (
    <div className="username-container">
      <div className="username-enterarea">
        <input type="text" required className="username-input" />
        <div className="username-lebelline">Enter your username</div>
      </div>
    </div>
  );
}

export default UsernameInput;
