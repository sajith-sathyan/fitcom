import axios from "axios";
import http from "http";
import https from "https";
import environment from "../config/environment.js";

if (!environment.USDA_API_KEY) {
  throw new Error("Missing USDA API key in environment variables");
}


const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

if (!environment.USDA_API_KEY) {
  throw new Error("Missing USDA API key in environment variables");
}

async function axiosGetWithRetry(url, options, retries = 3, delayMs = 1000) {
  try {
    return await axios.get(url, options);
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(r => setTimeout(r, delayMs));
    return axiosGetWithRetry(url, options, retries - 1, delayMs * 2);
  }
}


export async function searchFood(query) {
  if (!query || typeof query !== "string") {
    throw new Error("Invalid or missing query");
  }
  
  try {
    console.log(`[searchFood] Query: "${query}", Using API key: ${environment.USDA_API_KEY.slice(0, 4)}****`);
    const  params = {
      query,
      pageSize: 5,
      api_key: environment.USDA_API_KEY,
    }
    const res = await axios.get("https://api.nal.usda.gov/fdc/v1/foods/search", {
      params,
      timeout: 15000,
      httpAgent,
      httpsAgent,
    });
    return res.data.foods?.[0] || null;
  } catch (err) {
    console.error("[searchFood] USDA API request failed:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
    throw new Error("Failed to fetch food data. Please try again later.");
  }
}


export async function fetchSuggestions(query) {
    if (!query || typeof query !== "string") {
      throw new Error("Invalid or missing query");
    }
  
    const params = {
      query,
      pageSize: 5,
      api_key: environment.USDA_API_KEY,
    };
  
    try {
      const response = await axiosGetWithRetry("https://api.nal.usda.gov/fdc/v1/foods/search", {
        params,
        timeout: 15000,
        httpAgent,
        httpsAgent,
      });
      return response.data.foods;
    } catch (err) {
      console.error("[fetchSuggestions] USDA API request failed:", err.message);
      throw new Error("Suggestion fetch failed. Please try again later.");
    }
  }