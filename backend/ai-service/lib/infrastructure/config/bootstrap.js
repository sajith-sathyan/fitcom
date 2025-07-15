import dotenv from "dotenv";
dotenv.config();

import connectDB from "../database/setup.js";
async function init() {
  await connectDB();
  console.log("🚀 Bootstrap completed!");
}

export default { init };
