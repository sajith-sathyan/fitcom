import React from "react";
import Navbar from "../../component/navBar/Navbar";
import SubNavBar from "../../component/button/SubNavBar/SubNavBar";

function Progress() {
  const navOptions = [
    { label: "Overview", value: 1 },
    { label: " Workout Progress", value: 2 },
    { label: "Nutrition Progress", value: 3 },
    { label: "Body Measurements ", value: 4 },
  ];
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <SubNavBar options={navOptions} />
      </div>
    </div>
  );
}

export default Progress;
