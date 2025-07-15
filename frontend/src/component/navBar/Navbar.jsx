import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Style.css";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Extract the current route
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>
          Fitcom
        </Link>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/workout"
            className={currentPath === "/workout" ? "active" : ""}
          >
            Workouts
          </Link>
        </li>
        <li>
          <Link
            to="/nutrition"
            className={currentPath === "/nutrition" ? "active" : ""}
          >
            Nutrition
          </Link>
        </li>
        <li>
          <Link to="/sync" className={currentPath === "/sync" ? "active" : ""}>
            Sync Devices
          </Link>
        </li>
        <li>
          <Link
            to="/virtual-classes"
            className={currentPath === "/virtual-classes" ? "active" : ""}
          >
            Virtual Classes
          </Link>
        </li>
        <li>
          <Link
            to="/calculators"
            className={currentPath === "/calculators" ? "active" : ""}
          >
            Calculators
          </Link>
        </li>
        <li>
          <Link
            to="/goals"
            className={currentPath === "/goals" ? "active" : ""}
          >
            Goals
          </Link>
        </li>
        <li>
          <Link
            to="/ai-posture"
            className={currentPath === "/ai-posture" ? "active" : ""}
          >
            AI-Posture
          </Link>
        </li>
       
       
        <li>
          <Link
            to="/progress"
            className={currentPath === "/progress" ? "active" : ""}
          >
            Progress
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={currentPath === "/profile" ? "active" : ""}
          >
            Profile
          </Link>
        </li>
      </ul>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
