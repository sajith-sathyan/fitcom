// src/pages/Home.js
import React from "react";
import Navbar from "../Component/Navbar";
import CalorieCard from "../Component/CalorieCard";
import Banner from "../Component/Banner";
import MacrosCard from "../Component/MacrosCard";

function Home() {
  return (
    <>
      <Navbar />
      <div class="main-content">
        <Banner />
        <CalorieCard />
        <MacrosCard/>
      </div>
    </>
  );
}

export default Home;
