import React, { useState } from "react";
import "./Style.css";
import GoalSelectionButton from "../../Component/Button/GoalSelectionButton/GoalSelectionButton";
import usePagination from "../../Hooks/usePagination";
import { WorkoutRecommendationOptions } from "../../utils/constants";

function GoalSelection() {
  const { currentPage, totalPages, handleNext, handlePrevious } = usePagination(
    WorkoutRecommendationOptions.length,
    1
  );

  return (
    <div className="goal-container">
      <h4>{WorkoutRecommendationOptions[currentPage].question}</h4>

      {WorkoutRecommendationOptions[currentPage].options.map(
        (option, index) => (
          <GoalSelectionButton
            key={index}
            title={option}
            onClick={() => alert(option)}
          />
        )
      )}

      {/* Pagination Buttons */}
      <div className="pagination-buttons">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GoalSelection;
