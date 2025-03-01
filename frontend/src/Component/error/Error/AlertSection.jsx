import React from "react";
import "./Style.css"; // New styles for a modern look

const AlertSection = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="custom-alert">
      <div className={`custom-alert-box alert-${message.type}`}>
        <div className="alert-content">
          <i className={`alert-icon ${message.icon}`}></i>
          <div>
            <strong>{message.title}</strong>
            <p>{message.message}</p>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default AlertSection;
