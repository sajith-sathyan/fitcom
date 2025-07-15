// src/components/CalorieCard.js
import React, { useState } from "react";
import CaloriesChart from "../../charts/caloriesChart/CaloriesChart"; // Import the CaloriesChart component
import CaloriesInfo from "../../CaloriesInfo"; // Import the CaloriesInfo component

function CalorieCard() {
  const [calories, setCalories] = useState({
    caloriesBurned: 500,
    caloriesConsumed: 1200,
    remainingCalories: 2600,
    goal: 3000,
    food: 0,
    exercise: 0,
  });

  const percentage = (calories.caloriesConsumed / calories.goal) * 100;

  return (
    <div className="calories">
      <div className="calories-container">
        <CaloriesChart percentage={percentage} />
        <CaloriesInfo
          goal={calories.goal}
          food={calories.food}
          exercise={calories.exercise}
          remainingCalories={calories.remainingCalories}
        />
      </div>
    </div>
  );
}

export default CalorieCard;
