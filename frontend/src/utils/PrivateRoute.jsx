// src/utils/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    return token && email ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
