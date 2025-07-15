import React, { useState } from "react";
import "./Style.css"; // Make sure to use a separate CSS file

const SubNavBar = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0].value); // Default to first option

  const handleClick = (value) => {
    setSelected(value); // Update selected button
    onSelect(value); // Notify parent component
  };

  return (
    <div className="workout-navbar">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`workout-tab ${selected === option.value ? "active" : ""}`}
        >
          {option.label + " "}
        </button>
      ))}
    </div>
  );
};

export default SubNavBar;
