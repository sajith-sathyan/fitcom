import React, { useState } from 'react'
import '../WeightGoal/WeightGoal';

function WeeklyGoal({ onNext, onBack, onSelection}) {
    const options = [
       '0.25 kg (0.5 lbs)',
       '0.5 kg (1 lb)'
        
      ];
    
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);  
    onSelection(options[index]); 
  };

  return (
    <div><div className="container">
    <h1>How much weight do you want to lose per week?</h1>

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
    <button className="nav-btn" onClick={onNext}>Next</button>
    </div>
  </div></div>
  )
}

export default WeeklyGoal