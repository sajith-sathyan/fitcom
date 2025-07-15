import dotenv from "dotenv";
dotenv.config();

export default (() => {
  console.log("✅ [env] Environment variables have been injected from `.env`");

  const env = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL:process.env.FRONTEND_URL,
    USDA_API_KEY:process.env.USDA_API_KEY
  };

  return env;
})();
