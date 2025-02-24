import React, { useState, useEffect } from "react";
import Navbar from "../../component/navBar/Navbar";
import WorkoutNavBar from "../../Component/Button/WorkoutNavBar/WorkoutNavBar";
import MyWorkout from "../../Component/MyWorkout";
import QuickStart from "../../Component/QuickStart";
import AllWorkouts from "../../Component/Common/AllWorkouts";

function Workouts() {
  const [navbarStatus, setNavbarStatus] = useState(1);

  const getNavbarStatus = (status) => {
    setNavbarStatus(status); // Update state
  };

  useEffect(() => {
    console.log(navbarStatus);
  }, [navbarStatus]);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <WorkoutNavBar getNavbarStatus={getNavbarStatus} />
      </div>
      {navbarStatus === 1 && (
        <div>
          <AllWorkouts />
        </div>
      )}
      {navbarStatus === 2 && (
        <div>
          <MyWorkout />
        </div>
      )}
      {navbarStatus === 3 && (
        <div>
          <QuickStart />
        </div>
      )}
    </>
  );
}

export default Workouts;
