import { useState } from "react";

const usePagination = (totalPages, initialPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return { currentPage, totalPages, handleNext, handlePrevious };
};

export default usePagination;
