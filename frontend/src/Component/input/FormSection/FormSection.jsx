import React from "react";
import "./Style.css";

const FormSection = ({ title, description, inputs, unitChangeText }) => {
  return (
    <div>
      <div className="text-container">
        <h5>{title}</h5>
        {description && <p>{description}</p>}
      </div>
      <div className="input-container">
        {inputs.map((input, index) => (
          <input
            key={index}
            type="text"
            placeholder={input}
            className="input-field"
          />
        ))}
      </div>
      {unitChangeText && <h6 className="blue-text">{unitChangeText}</h6>}
    </div>
  );
};

export default FormSection;
