import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: process.env.CALCULATOR_SERVICE_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/calculator-service": "", // remove /calculator from path
    },
  })
);

export default router;
