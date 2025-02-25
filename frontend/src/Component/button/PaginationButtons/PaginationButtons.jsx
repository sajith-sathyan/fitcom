import React from "react";
import "./Style.css";

const PaginationButtons = ({ onPrevious, onNext, currentPage, totalPages }) => {
  return (
    <div className="pagination-buttons">
      <button
        className="nav-button"
        onClick={onPrevious}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <button
        className="nav-button"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
