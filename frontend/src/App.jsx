import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Nutrition from "./pages/ Nutrition/ Nutrition";
import Goal from "./Pages/Goal/Goal";
import Register from "./Pages/Register/Register";
import Workout from "./Pages/Workouts/Workouts";
import GoalSelection from "./pages/GoalSelection/GoalSelection";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/goalSelection" element={<GoalSelection />} />

        <Route path="/workout" element={<Workout />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/goals" element={<Goal />} />
      </Routes>
    </Router>
  );
}

export default App;
