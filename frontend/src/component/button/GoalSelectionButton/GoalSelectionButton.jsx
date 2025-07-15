import React from "react";
import "./Style.css";

function GoalSelectionButton({ title, onClick, className }) {
  return (
    <button className={`black-border-button ${className}`} onClick={onClick}>
      {title}
    </button>
  );
}

export default GoalSelectionButton;
