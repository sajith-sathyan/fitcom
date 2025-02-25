import React from "react";
import "./Style.css";

function GoalSelectionButton({ title, onClick }) {
  return (
    <div>
      <button className="black-border-button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default GoalSelectionButton;
