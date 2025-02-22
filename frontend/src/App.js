import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import './App.css'
import Workout from "./Pages/Workout";
import Nutrition from "./Pages/ Nutrition";
import Goal from "./Pages/Goal";
import Register from "./Pages/Register";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Welcome />} />
        <Route path="/add-diet-info" element={<AddDeitInfoPage />} /> */}
        <Route path="/Register" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/goals" element={<Goal />} />

      </Routes>
    </Router>
  );
}

export default App;
