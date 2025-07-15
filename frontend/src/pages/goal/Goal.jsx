import React, { useState } from "react";
import Navbar from "../../component/navBar/Navbar";
import BuildMuscle from "../../component/common/BuildMuscle/BuildMuscle"; // ✅ Import added
import "./Style.css";
import SubNavBar from "../../component/button/SubNavBar/SubNavBar";
import FatLoss from "../../component/common/FatLoss/FatLoss";
import BoostEndurance from "../../component/common/BoostEndurance/BoostEndurance";
import FlexibilityMobility from "../../component/common/FlexibilityMobility/FlexibilityMobility";
import MentalWellness from "../../component/common/MentalWellness/MentalWellness";
import ExplosiveStrength from "../../component/common/Explosive Strength/Explosive Strength";
import SpeedAgility from "../../component/common/SpeedAgility/SpeedAgility";
import BodyRecomposition from "../../component/common/BodyRecomposition/BodyRecomposition";

function Goal() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);

  const navOptions = [
    { label: "Build Muscle", value: 1 },
    { label: "Fat Loss", value: 2 },
    { label: "Boost Endurance", value: 3 },
    { label: "Flexibility & Mobility", value: 4 },
    { label: "Mental Wellness", value: 5 },
    { label: "Explosive Strength", value: 6 },
    { label: "Speed & Agility", value: 7 },
    { label: "Body Recomposition", value: 8 },
  ];




  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    console.log("Selected goal:", goal);
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <SubNavBar options={navOptions} onSelect={setNavbarStatus} />
      </div>
      {navbarStatus === 1 && (<BuildMuscle />)}
      {navbarStatus === 2 && (<FatLoss />)}
      {navbarStatus === 3 && (<BoostEndurance />)}
      {navbarStatus === 4 && (<FlexibilityMobility />)}
      {navbarStatus === 5 && (<MentalWellness />)}
      {navbarStatus === 6 && (<ExplosiveStrength />)}
      {navbarStatus === 7 && (<SpeedAgility />)}
      {navbarStatus === 8 && (<BodyRecomposition />)}
    </div>
  );
}

export default Goal;
