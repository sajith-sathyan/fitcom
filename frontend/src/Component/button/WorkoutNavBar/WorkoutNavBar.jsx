import React, { useState } from "react";
import "./Style.css";

function WorkoutNavBar({ getNavbarStatus }) {
  const [selected, setSelected] = useState(1); // Track selected button

  const handleClick = (status) => {
    setSelected(status); // Update selected button
    getNavbarStatus(status);
  };

  return (
    <div className="workout-container">
      <button
        onClick={() => handleClick(1)}
        className={`workout-card ${selected === 1 ? "active" : ""}`}
      >
        <h5>All Workouts</h5>
      </button>
      <button
        onClick={() => handleClick(2)}
        className={`workout-card ${selected === 2 ? "active" : ""}`}
      >
        <h5>My Workouts</h5>
      </button>
      <button
        onClick={() => handleClick(3)}
        className={`workout-card ${selected === 3 ? "active" : ""}`}
      >
        <h5>Quick Start</h5>
      </button>
    </div>
  );
}

export default WorkoutNavBar;
