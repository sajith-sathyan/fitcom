// src/pages/Home.js
import React from "react";
import Navbar from "../../Component/NavBar/Navbar";
import CalorieCard from "../../Component/Cards/CalorieCard/CalorieCard";
import Banner from "../../Component/Banner/Banner";
import MacrosCard from "../../Component/Cards/MacrosCard/MacrosCard";

function Home() {
  return (
    <>
      <Navbar />
      <div class="main-content">
        <Banner />
        <CalorieCard />
        <MacrosCard />
      </div>
    </>
  );
}

export default Home;
