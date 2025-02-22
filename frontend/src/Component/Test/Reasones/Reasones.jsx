import React, { useState, useEffect } from 'react';
import '../WeightGoal/WeightGoal.css';

function Reasones({ onNext, onBack, onSelection, activeSelection }) {
  const options = [
    'Competitive sports performance',
    'My healthcare provider has recommended it',
    'I am overweight',
    'I want to feel better and more energetic',
    'Other'
  ];

  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // Set the active button based on activeSelection when the component loads
  useEffect(() => {
    if (activeSelection) {
      const index = options.indexOf(activeSelection);
      if (index !== -1) {
        setActiveButton(index);  // Set previously selected option as active
      }
    }
  }, [activeSelection]);

  // Handle button click and set the active button
  const handleButtonClick = (index) => {
    setActiveButton(index);  // Mark the button as active
    onSelection(options[index]); // Pass the selected value to the parent component
  };

  return (
    <div className="container">
      <h1>Why do you want to lose weight?</h1>

      <div className="btn-group">
        {options.map((text, index) => (
          <button
            key={index}
            className={`btn ${activeButton === index ? 'active' : ''}`}  // Conditionally add 'active' class
            onClick={() => handleButtonClick(index)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        {/* Go back to the previous step */}
        <button className="nav-btn" onClick={onBack}>Back</button>
        
        {/* Enable "Next" only if an option is selected */}
        <button className="nav-btn" onClick={onNext} disabled={activeButton === null}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Reasones;
