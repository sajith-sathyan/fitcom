import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../../interface/routes/authRoutes.js";
import profileRoutes from "../../interface/routes/profileRoutes.js";
import environment from "../config/environment.js";
const createServer = async () => {
  const app = express();


  app.use(cookieParser());
  app.use(express.json());
  app.use(cors({
    origin: environment.FRONTEND_URL, // e.g., "http://localhost:5173"
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Allow all necessary methods
    credentials: true               // Allow credentials (cookies, auth headers)
  }));



  app.use(express.urlencoded({ extended: true }));

  app.use("/", authRoutes);
  app.use("/users",profileRoutes );
  return app;
};

export default createServer;
