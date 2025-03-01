import React from "react";
import "./Style.css";

function PaginationButtons({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}) {
  return (
    <div className="pagination-buttons">
      <button
        className="nav-button"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        Previous
      </button>
      <button className="nav-button" onClick={onNext} disabled={disableNext}>
        Next
      </button>
    </div>
  );
}

export default PaginationButtons;
