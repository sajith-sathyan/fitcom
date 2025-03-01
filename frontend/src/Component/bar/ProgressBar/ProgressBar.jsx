import React from "react";
import { ProgressBar } from "react-bootstrap"; // Importing ProgressBar from react-bootstrap

function ProgressComponent({ progress }) {
  const now = progress; // Progress value

  return <ProgressBar now={now} />;
}

export default ProgressComponent;
