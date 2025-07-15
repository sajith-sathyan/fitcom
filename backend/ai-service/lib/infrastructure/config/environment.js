import dotenv from "dotenv";
dotenv.config();

export default (() => {
  console.log("✅ [env] Environment variables have been injected from `.env`");

  const env = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    FRONTEND_URL:process.env.FRONTEND_URL,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    GOOGLE_OAUTH_CLIENT_ID:process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET:process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    FRONTEND_URL:process.env.FRONTEND_URL
  };

  return env;
})();
