import React from "react";
import Navbar from "../../component/navBar/Navbar";
import Banner from "../../component/banner/Banner";
import SubNavBar from "../../component/button/SubNavBar/SubNavBar";
import SmartwatchProductCard from "../../component/cards/DeviceCard/DeviceCard";
import "./Style.css";
import ColorFullHeading from "../../component/colorFullHeading/ColorFullHeading";

function Sync() {
  const Url =
    "https://media.istockphoto.com/id/1286099942/photo/close-up-of-hand-touching-smartwatch-with-health-app-on-the-screen-gadget-for-fitness-active.jpg?s=1024x1024&w=is&k=20&c=bKWzMomyZa9YPlgF-kAW0X1DHo1pm9InlCYDq6SOmSs=";

  const navOptions = [
    { label: "Connected Devices", value: 1 },
    { label: "🧩 Available Devices", value: 2 },
    { label: "📈 Sync History", value: 3 },
  ]

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <SubNavBar options={navOptions} />
      </div>
      <div className="page">
        {/* <Banner ImageUrl={Url} /> */}

        {/* Heading for Connected Devices */}
        <ColorFullHeading HeadingTitle={"🔗 Connected Devices"} />

        {/* Smartwatch Cards */}
        <div className="devices-container">
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
          <SmartwatchProductCard />
        </div>
      </div>
    </div>
  );
}

export default Sync;
