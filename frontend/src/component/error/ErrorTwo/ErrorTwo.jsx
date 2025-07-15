import React from "react";
import "./Style.css"; // ✅ Make sure this CSS file exists

const Alert = ({ type, message }) => {
  return (
    <div className={`alert ${type}`}>
      <strong>{type.toUpperCase()}:</strong> {message}
    </div>
  );
};

export default Alert;
