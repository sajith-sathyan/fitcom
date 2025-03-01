// src/components/Banner.jsx
import React from "react";
import "./Style.css";
const Banner = ({ ImageUrl }) => {
  return (
    <div className="banner">
      <img src={ImageUrl} alt="Fitcom Banner" className="banner-image" />
    </div>
  );
};

export default Banner;
