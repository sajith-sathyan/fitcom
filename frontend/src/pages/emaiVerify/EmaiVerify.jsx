import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style.css";

const EmailVerification = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://your-backend.com/api/verify-email/${token}`);
        const data = await response.json();
        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <div className="card">
        <div className="icon">{status === "success" ? "✅" : status === "loading" ? "⏳" : "❌"}</div>
        <h2>
          {status === "loading"
            ? "Verifying Email..."
            : status === "success"
            ? "Email Verified!"
            : "Verification Failed"}
        </h2>
        <p>
          {status === "loading"
            ? "Please wait while we verify your email."
            : status === "success"
            ? "Your email has been successfully verified. You can now log in."
            : "Verification failed. The link may be invalid or expired."}
        </p>
        {status === "error" && (
          <a href="/resend-verification" className="btn">
            Resend Verification Email
          </a>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
