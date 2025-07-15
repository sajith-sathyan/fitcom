// src/components/CaloriesInfo.js
import React from 'react';

function CaloriesInfo({ goal, food, exercise, remainingCalories }) {
  return (
    <div className="calories-info">
      <p><strong>Goal:</strong> {goal}</p>
      {/* <p><strong>Food:</strong> {food}</p>
      <p><strong>Exercise:</strong> {exercise}</p>
      <p><strong>Calories Remaining:</strong> {remainingCalories}</p> */}
    </div>
  );
}

export default CaloriesInfo;
