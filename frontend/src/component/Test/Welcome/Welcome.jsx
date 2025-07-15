import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Welcome.css"; // Import CSS for the welcome screen

const Welcome = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click and navigate to /add-diet-info
  const handleGetStarted = () => {
    navigate("/add-diet-info");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>fitcom</h1>

        <p className="motivational-quote">
          <span className="bold">Dream It, Achieve It</span> – We're with You Every Step of the Way.
        </p>

        <br />
        {/* Attach the handleGetStarted function to the button's onClick */}
        <button className="welcome-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
