import React, { useState } from "react";
import Navbar from "../../component/navBar/Navbar";

function Goal() {
  const [selected, setSelected] = useState(0);

  const handleClick = (status) => {
    setSelected(status);
  };
  return (
    <div>
      <Navbar />
      <div className="goal-main-container">
        <button
          onClick={() => handleClick(1)}
          className={`goal-card ${selected === 1 ? "active" : ""}`}
        >
          <h5>Create Goal</h5>
        </button>
      </div>
    </div>
  );
}

export default Goal;
