export const handleSelectOption = (
  option,
  currentPage,
  setSelectedOptions,
  setAlertMessage
) => {
  setSelectedOptions((prev) => ({
    ...prev,
    [currentPage]: prev[currentPage] === option ? null : option,
  }));
  setAlertMessage(null);
};

export const handleFormValidation = (values, isValid, setIsFormValid) => {
  setIsFormValid(isValid);
};

export const handleNextPage = (
  currentPage,
  selectedOptions,
  setAlertMessage,
  handleNext,
  OhSnap
) => {
  if (!selectedOptions[currentPage]) {
    setAlertMessage({
      ...OhSnap,
      message: "Please select an option before proceeding.",
    });
    return;
  }

  setAlertMessage(null);
  handleNext();
};
