"use strict";
import env from "../config/environment.js";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.DATABASE_URL);
    console.log(
      `✅ [database] Established connection with MongoDB @ ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
    console.error(`🆘[DATABASE WARNING] ${error.message}`);
    console.log("Are you sure MongoDB is running?");
  }
};

export default connectDB;

// abhishekprlearning
//FxB7cN96dEXegoYL
//mongodb+srv://abhishekprlearning:<db_password>@fitcomuserservice.iv195.mongodb.net/?retryWrites=true&w=majority&appName=FitcomUserService
