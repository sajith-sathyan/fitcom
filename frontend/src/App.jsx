import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Nutrition from "./pages/nutrition/Nutrition.jsx";
import Register from "./Pages/Register/Register";
import Workout from "./Pages/Workouts/Workouts";
// import GoalSelection from "./pages/GoalSelection/GoalSelection"
import TestBuild from "./pages/TestBuild/TestBuild";
import Sync from "./pages/sync-devices/Sync";
import Profile from "./pages/profile/profile";
import VirtualClasses from "./pages/virtual-classes/VirtualClasses";
import Posture from "./pages/posture/Posture.jsx";
import Progress from "./pages/progress/Progress";
import Goal from "./pages/goal/Goal";
import Calculators from "./pages/calculators/Calculators";
import EmaiVerify from "./pages/emaiVerify/EmaiVerify";
import Login from "./pages/login/Login";
import GoalSelection from "./pages/goalSelection/GoalSelection";
import PrivateRoute from './utils/PrivateRoute.jsx'
import Chatbot from './pages/chatBot/Chatbot.jsx';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/goalSelection" element={
          <PrivateRoute><GoalSelection /></PrivateRoute>
        } />
        <Route path="/workout" element={   <PrivateRoute><Workout /></PrivateRoute>} />
        <Route path="/nutrition" element={ <PrivateRoute><Nutrition /></PrivateRoute>} />
        <Route path="/sync" element={<PrivateRoute><Sync /></PrivateRoute>} />
        <Route path="/ai-posture" element={<PrivateRoute><Posture /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
        <Route path="/virtual-classes" element={<PrivateRoute><VirtualClasses /></PrivateRoute>} />
        <Route path="/goals" element={<PrivateRoute><Goal /></PrivateRoute>} />
        <Route path="/verify/:token" element={<EmaiVerify />} />
        <Route path="/test" element={<TestBuild />} />

      </Routes>
      {/* chat boat */}
      <Chatbot />

    </Router>
    
  );
}

export default App;
