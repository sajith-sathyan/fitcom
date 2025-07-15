import React from "react";
import "./Style.css";

function RangeSliderBar({ quantity, setQuantity }) {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setQuantity(newValue);
  };

  return (
    <div className="slider-container">
      <input
        id="slider"
        type="range"
        min="0"
        max="500"
        value={quantity}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, #4caf50 ${
            (quantity / 500) * 100
          }%, #ddd ${(quantity / 500) * 100}%)`,
        }}
      />
      <p>{quantity}g</p> {/* Display the quantity in grams */}
    </div>
  );
}

export default RangeSliderBar;
