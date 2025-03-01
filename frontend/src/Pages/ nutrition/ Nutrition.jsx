import React from "react";
import Navbar from "../../component/bar/navBar/Navbar";
import Banner from "../../component/banner/Banner";
import SubNavBar from "../../component/bar/SubNavBar/SubNavBar/SubNavBar";
import "./Style.css";

const Nutrition = () => {
  const Url =
    "https://media.istockphoto.com/id/1408877726/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=1024x1024&w=is&k=20&c=1o0Y7UgFuS2A3V-v7Bar2-egEk9GH36IAK3VxugyqU4=";
  const navOptions = [
    { label: "All Nutrition", value: 1 },
    { label: "Nutrition Calculator", value: 2 },
    { label: "My Nutrition", value: 3 },
  ];

  return (
    <div className="nutrition-page">
      <Navbar />
      <main className="main-content">
        <SubNavBar options={navOptions} />
        <Banner ImageUrl={Url} />
      </main>
    </div>
  );
};

export default Nutrition;
