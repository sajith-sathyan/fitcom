import React, { useState } from "react";
import Navbar from "../../component/navBar/Navbar";
import Banner from "../../component/banner/Banner";
import SubNavBar from "../../component/button/SubNavBar/SubNavBar";
import "./Style.css";
import AllNutrition from "../../component/common/AllNutrition/AllNutrition";
import NutritionCalculator from "../../component/common/NutritionCalculator/NutritionCalculator";

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);

  const navOptions = [
    { label: "🥗 All Nutrition", value: 1 },
    { label: "Nutrition Calculator", value: 2 },
    { label: "🍽️ My Nutrition", value: 3 },
  ];


  
  

  return (
    <div className="nutrition-page">
      <Navbar />
      <main className="main-content">
        <SubNavBar options={navOptions} onSelect={setNavbarStatus} />
      </main>
      {navbarStatus === 1 && <AllNutrition />}
      {navbarStatus === 2 && <NutritionCalculator />}
    </div>
  );
};

export default Nutrition;
