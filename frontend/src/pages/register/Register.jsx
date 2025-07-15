import React, { useState } from "react";
import EmailInput from "../../Component/Input/Email/EmailInput";
import PasswordInput from "../../Component/Input/Password/PasswordInput";
import PhoneNumberInput from "../../component/input/PhoneNumberInput/PhoneNumberInput";
import FirstNameInput from "../../component/input/FirstName/FirstName";
import LastNameInput from "../../component/input/LastName/LastName";
import axios from "axios";
// google login 
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth ,api, userService } from '../../api/authApi'
import { useNavigate } from 'react-router-dom';
import "./Style.css";


function Register({ onFormChange }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    if (onFormChange) {
      onFormChange(updatedData);
    }
  };
// firstname, secoundname , email , password, phone number register logic
  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(null);
    const username = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const submissionData = {
      username,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    };
    try {
      const submissionResponse = await api.post(
        `${userService}/register`,
        submissionData,
        { headers: { "Content-Type": "application/json" } }
      );
      

      if (submissionResponse.data) {
        setResponseMessage("Submission successful! 🎉");
        console.log("submissionResponse",submissionResponse.data)
        setAlertMessage(null);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  // google login logic
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name } = result.data;
        console.log(result.data)
        const token = result.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setResponseMessage("Google login successful! 🎉");
        setAlertMessage(null);
        // navigate('/');
      } else {
        throw new Error("Google authentication failed");
      }
    } catch (e) {
      console.error('Error during Google Login:', e);
      setResponseMessage("");
      setAlertMessage({
        type: "error",
        message: "Google login failed. Please try again.",
      });
    }
  };


  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="container">
      <div className="register-card">
        <h1 className="register-h1">Register</h1>
        {responseMessage ? (
          <p className="success-message">{responseMessage}</p>
        ) : alertMessage ? (
          <p className={`alert ${alertMessage.type}`}>{alertMessage.message}</p>
        ) : null}


        <form className="register-form" onSubmit={handleSubmission}>
          <FirstNameInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <LastNameInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <PhoneNumberInput
            name="phone"
            value={formData.phone}
            onChange={handleChange} />
          <EmailInput
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button className="btn-165" onClick={googleLogin} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            <span>Login with Google</span>
          </button>
          <button type="button" className="github-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
            >
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103z"></path>
            </svg>
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
