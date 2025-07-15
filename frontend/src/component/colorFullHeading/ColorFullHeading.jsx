import React, { useState, useEffect } from "react";
import "./Style.css";

function ColorFullHeading({ HeadingTitle }) {
  const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#6f42c1"]; // Blue, Green, Red, Yellow, Purple
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        return colors[(currentIndex + 1) % colors.length]; // Cycle through colors
      });
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, []);

  return (
    <h2
        className="connected-devices-heading"
        style={{
          color: currentColor,
          borderBottom: `3px solid ${currentColor}`,
          borderLeft: `5px solid ${currentColor}`,
        }}
    >
      {HeadingTitle}
    </h2>
  );
}

export default ColorFullHeading;
