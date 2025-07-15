export const weightUnits = ["lbs", "kg", "stone", "grams", "ounces"];
export const heightUnits = ["cm", "meters", "feet", "inches"];

export const fields = [
  {
    name: "height",
    title: "How tall are you?",
    description: "It's okay to estimate. You can update this later.",
    defaultUnit: "cm",
  },
  {
    name: "weight",
    title: "How much do you weigh?",
    description: "Your current weight helps in tracking progress.",
    defaultUnit: "kg",
  },
  {
    name: "goalWeight",
    title: "What is your goal weight?",
    description: "Set a target weight. You can always change it later.",
    defaultUnit: "kg",
  },
];

export const getUnits = (name) => {
  return name.includes("height") ? heightUnits : weightUnits;
};

export const initializeFormData = () => {
  return fields.reduce((acc, field) => {
    acc[field.name] = { value: "", unit: field.defaultUnit, error: "" };
    return acc;
  }, {});
};

export const validateField = (value) => {
  if (!value || value.trim() === "") return "This field is required";
  if (!/^\d*\.?\d*$/.test(value)) return "Please enter a valid number"; // Allow only numbers and decimals
  if (Number(value) <= 0) return "Please enter a number greater than 0";
  return "";
};

export const validateForm = (formData, setFormData) => {
  let isFormValid = true;
  const updatedFormData = { ...formData };

  fields.forEach((field) => {
    const value = updatedFormData[field.name].value;
    const error = validateField(value);
    updatedFormData[field.name].error = error;
    if (error) {
      isFormValid = false;
    }
  });

  setFormData(updatedFormData);
  return isFormValid;
};

export const handleChange = (
  field,
  value,
  formData,
  setFormData,
  onValidate
) => {
  const sanitizedValue = value || "";
  const error = validateField(sanitizedValue);

  setFormData((prev) => {
    const updatedData = {
      ...prev,
      [field]: { ...prev[field], value: sanitizedValue, error },
    };

    // Validate form after every change
    const isValid = Object.values(updatedData).every(
      (item) => item.value.trim() !== "" && item.error === ""
    );

    if (onValidate) {
      onValidate(updatedData, isValid);
    }

    return updatedData;
  });
};

export const handleUnitChange = (field, unit, setFormData) => {
  setFormData((prev) => ({
    ...prev,
    [field]: { ...prev[field], unit },
  }));
};

export const handleNext = (formData, setFormData) => {
  if (validateForm(formData, setFormData)) {
    console.log("Form is valid, proceeding...");
  } else {
    console.log("Form has errors, cannot proceed.");
  }
};
