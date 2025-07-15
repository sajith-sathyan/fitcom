import axios from("axios");
import IOpenAiService from '../../domain/service/IOpenAiService'

export default class OpenRouterService extends IOpenAiService  {
  static API_URL = "https://openrouter.ai/api/v1/chat/completions";
  static API_KEY = "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";

  static async getWorkoutPlan(userData) {
    const prompt = `Create a 1-week personalized workout plan based on this user input:\n${JSON.stringify(userData, null, 2)}.\n
The plan should match the user's goals, available equipment, and experience level.

Return the plan strictly in this JSON structure:

{
  "Monday": {
    "Workout": "Full Body Strength Training",
    "Exercises": [
      { "name": "Barbell Squats", "sets": 4, "reps": "8-10" },
      { "name": "Deadlifts", "sets": 4, "reps": "8-10" },
      { "name": "Bench Press", "sets": 4, "reps": "8-10" }
    ],
    "Rest": "60 seconds between sets"
  },
  ...
}

No markdown, no additional notes. Just valid JSON.`;

    try {
      const response = await axios.post(
        this.API_URL,
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a certified fitness coach.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://localhost",
            "X-Title": "Workout Planner",
          },
        }
      );

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error("Error generating workout plan:", error.response?.data || error.message);
    }
  }
}

module.exports = OpenRouterService;
