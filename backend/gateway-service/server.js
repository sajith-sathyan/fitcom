import express from "express";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import calculatorRoutes from "./routes/calculatorRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Gateway routes
app.use("/ai-service", aiRoutes);
app.use("/calculator-service", calculatorRoutes);
app.use("/nutrition-service", nutritionRoutes);
app.use("/user-service",userRoutes );
app.use("/workout-service", workoutRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
