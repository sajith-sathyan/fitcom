import React, { useState, useEffect } from 'react';
import '../WeightGoal/WeightGoal.css';

function ActivityLevel({ onNext, onBack, onSelection, activeSelection }) {
  const options = [
    'Not very active',
    'Lightly active',
    'Active',
    'Very active'
  ];
  
  const [activeButton, setActiveButton] = useState(null);

  // Set the active button if an option was previously selected
  useEffect(() => {
    if (activeSelection) {
      const index = options.indexOf(activeSelection);
      if (index !== -1) {
        setActiveButton(index);
      }
    }
  }, [activeSelection]);

  const handleButtonClick = (index) => {
    setActiveButton(index);  
    onSelection(options[index]); // Pass the selected value to the parent component
  };

  return (
    <div className="container">
      <h1>What is your current activity level?</h1>

      <div className="btn-group">
        {options.map((text, index) => (
          <button
            key={index}
            className={`btn ${activeButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={onBack}>Back</button>  
        <button className="nav-btn" onClick={onNext} disabled={activeButton === null}>Next</button>
      </div>
    </div>
  );
}

export default ActivityLevel;
