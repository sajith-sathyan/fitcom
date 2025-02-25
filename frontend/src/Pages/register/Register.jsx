import React, { useState } from "react";
import EmailInput from "../../Component/Input/Email/EmailInput";
import UsernameInput from "../../Component/Input/Username/UsernameInput";
import PasswordInput from "../../Component/Input/Password/PasswordInput";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Style.css";

function Register() {
  const [user, setUser] = useState(null); // Store user data

  return (
    <div className="register-main">
      <div className="register-card">
        <h1 className="register-h1">Register</h1>

        <div className="register-form">
          <UsernameInput />
          <EmailInput />
          <PasswordInput />

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decodedUser = jwtDecode(credentialResponse.credential);
              setUser(decodedUser);
              console.log("User Info:", decodedUser);
            }}
            onError={() => console.log("Login failed")}
            theme="outline"
            size="large"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
