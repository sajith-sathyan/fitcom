import React, { useState } from "react";
import "./Style.css";
import GoalSelectionButton from "../../Component/Button/GoalSelectionButton/GoalSelectionButton";
import usePagination from "../../Hooks/usePagination";
import AlertSection from "../../component/error/Error/AlertSection";
import FormSection from "../../component/common/FormSection/FormSections";
import { WorkoutRecommendationOptions } from "../../utils/constants";
import { OhSnap } from "../../utils/alertData";
import Register from "../../Pages/Register/Register";
import ProgressBar from "../../component/bar/ProgressBar/ProgressBar";

function GoalSelection() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const { currentPage, totalPages, handleNext, handlePrevious } = usePagination(
    WorkoutRecommendationOptions.length + 2,
    1
  );

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentPage]: prev[currentPage] === option ? null : option,
    }));
    setAlertMessage(null);
  };

  const handleNextPage = () => {
    if (currentPage !== 11) {
      if (selectedOptions[currentPage]) {
        setAlertMessage(null);
        handleNext();
      } else {
        setAlertMessage({
          ...OhSnap,
          message: "Please select an option before proceeding.",
        });
      }
    } else {
      handleNext();
      setAlertMessage(null);
    }
  };

  return (
    <>
      <div className="goal-container">
        <div className="progressbar">
          <ProgressBar progress={(currentPage / 12) * 100} />
        </div>
        {alertMessage && (
          <AlertSection
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
          />
        )}

        {/* Conditional Rendering */}
        {currentPage === 11 ? (
          <FormSection
            title="Personalize Your Plan"
            inputs={["Weight (lbs)", "Height (Feet)", "Height (Inches)"]}
          />
        ) : currentPage === 12 ? (
          <Register />
        ) : (
          <>
            <h4>{WorkoutRecommendationOptions[currentPage].question}</h4>

            {WorkoutRecommendationOptions[currentPage].options.map(
              (option, index) => (
                <GoalSelectionButton
                  key={index}
                  title={option}
                  onClick={() => handleSelectOption(option)}
                  className={
                    selectedOptions[currentPage] === option
                      ? "selected-option"
                      : ""
                  }
                />
              )
            )}
          </>
        )}

        <div className="pagination-buttons">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button className="nav-button" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default GoalSelection;
