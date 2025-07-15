import React, { useState } from "react";
import "./Style.css";
import Navbar from "../../component/navBar/Navbar";
import SubNavBar from "../../component/button/SubNavBar/SubNavBar";
import Account from "../../component/common/Account/Account";
import Passowrd from "../../component/common/Passowrd/Passowrd";
import Security from "../../component/common/Security/Security";
function Profile() {
    const [navbarStatus, setNavbarStatus] = useState(1);
  
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <SubNavBar  
          options={[
            { label: "Account", value: 1 },
            { label: "Passowrd", value: 2 },
            { label: "Security", value: 3 },
          ]}
          onSelect={setNavbarStatus} // Updates state
        />
      </div>
      {navbarStatus === 1 && < Account/>}
      {navbarStatus === 2 && <Passowrd />}
      {navbarStatus === 3 && <Security />}
    </div>
  );
}

export default Profile;
