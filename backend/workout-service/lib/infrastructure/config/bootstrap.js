import dotenv from "dotenv";
import connectDB from "../database/setup.js";

dotenv.config();

async function init() {
  await connectDB();
  console.log("🚀 Bootstrap completed!");
}

export default { init };
