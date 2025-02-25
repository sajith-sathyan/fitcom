import React from "react";
import "./Style.css";

function UsernameInput() {
  return (
    <div>
      <div className="enterarea">
        <input id="register" type="text" required />
        <div className="lebelline">Enter your username</div>
      </div>
    </div>
  );
}

export default UsernameInput;
