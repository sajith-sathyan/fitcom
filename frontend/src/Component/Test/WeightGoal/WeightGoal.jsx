import React, { useState, useEffect } from "react";
import "./WeightGoal.css";

function WeightGoal({ onNext, onSelection, activeSelection }) {
  const options = [
    "Lose weight",
    "Maintain weight",
    "Gain weight",
    "Gain muscle",
    "Modify my diet",
    "Manage stress",
    "Increase step count",
  ];

  // State to track the active button (selected option)
  const [activeButton, setActiveButton] = useState(null);

  // Set the active button if an option was previously selected
  useEffect(() => {
    if (activeSelection) {
      const index = options.indexOf(activeSelection);
      setActiveButton(index);  // Set the previously selected option as active
    }
  }, [activeSelection]); // Re-run this effect whenever activeSelection changes

  // Handle button click and set the active button
  const handleButtonClick = (index) => {
    setActiveButton(index); // Mark the button as active
    onSelection(options[index]); // Pass the selected value to the parent component
  };

  return (
    <div className="container">
      <h1>What is your current activity level?</h1>

      <div className="btn-group">
        {options.map((text, index) => (
          <button
            key={index}
            className={`btn ${activeButton === index ? "active" : ""}`}
            onClick={() => handleButtonClick(index)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        {/* Only enable the "Next" button if an option is selected */}
        <button
          className="nav-btn"
          onClick={onNext}
          disabled={activeButton === null}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WeightGoal;
