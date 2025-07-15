import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function ProgressComponent({ progress }) {
  return <ProgressBar now={progress} label={`${progress}%`} variant="success" />;
}

export default ProgressComponent;
