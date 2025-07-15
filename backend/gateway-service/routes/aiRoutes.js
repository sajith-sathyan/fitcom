import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: process.env.AI_SERVICE_URL || "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/ai-service": "", // remove /ai from path
    },
  })
);

export default router;
