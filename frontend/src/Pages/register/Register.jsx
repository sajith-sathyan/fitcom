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
    <div>
      <h1 className="register-h1">Register</h1>
      <div className="register-card">
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
            theme="filled_blue" // Changes button color
            size="large"
            shape="pill"
            auto_select={false} // Prevents auto-login
            useOneTap={false} // Disables automatic One-Tap sign-in
            prompt="select_account" // Forces selection, preventing auto sign-in
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
