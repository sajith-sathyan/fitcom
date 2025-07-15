// src/pages/Home.js
import React from "react";
import Navbar from "../../component/navBar/Navbar";
import CalorieCard from "../../Component/Cards/CalorieCard/CalorieCard";
import Banner from "../../component/banner/Banner";
import MacrosCard from "../../Component/Cards/MacrosCard/MacrosCard";

function Home() {
  const Url =
    "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const userInfo = JSON.parse(localStorage.getItem('user-info'));

  return (
    <>
      <Navbar />
      <div class="main-content">
        <Banner ImageUrl={Url} />
        <CalorieCard />
        <MacrosCard />
      </div>
    </>
  );
}

export default Home;
