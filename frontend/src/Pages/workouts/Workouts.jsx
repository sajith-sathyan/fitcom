import React, { useState } from "react";
import Navbar from "../../component/bar/navBar/Navbar";
import SubNavBar from "../../component/bar/SubNavBar/SubNavBar/SubNavBar";
import MyWorkout from "../../component/MyWorkout";
import QuickStart from "../../component/QuickStart";
import AllWorkouts from "../../component/Common/AllWorkouts";

function Workouts() {
  const [navbarStatus, setNavbarStatus] = useState(1);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <SubNavBar
          options={[
            { label: "All Workouts", value: 1 },
            { label: "My Workouts", value: 2 },
            { label: "Quick Start", value: 3 },
          ]}
          onSelect={setNavbarStatus}
        />
      </div>
      {navbarStatus === 1 && <AllWorkouts />}
      {navbarStatus === 2 && <MyWorkout />}
      {navbarStatus === 3 && <QuickStart />}
    </>
  );
}

export default Workouts;
