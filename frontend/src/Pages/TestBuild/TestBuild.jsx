import React from "react";
import "./Style.css";

const Nutrition = () => {
  return (
    <div className="nutrition-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Fuel Your Body with the Right Nutrition
          </h1>
          <p className="hero-text">
            Get personalized meal plans and expert nutrition advice to achieve
            your fitness goals.
          </p>
          <a href="#" className="hero-button">
            Get Started
          </a>
        </div>
      </section>

      {/* Nutrition Plans */}
      <section className="section">
        <h2 className="section-title">Choose Your Nutrition Plan</h2>
        <div className="grid-container grid-3">
          {[
            {
              title: "Weight Loss",
              desc: "Low-calorie meals to help you shed extra pounds while staying energized.",
            },
            {
              title: "Muscle Gain",
              desc: "High-protein diets designed to build lean muscle mass efficiently.",
            },
            {
              title: "Balanced Diet",
              desc: "A well-rounded meal plan for overall health and wellness.",
            },
          ].map((plan, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{plan.title}</h3>
              <p className="card-text">{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Macronutrient Breakdown */}
      <section className="section bg-light">
        <h2 className="section-title">Macronutrient Breakdown</h2>
        <div className="grid-container grid-3">
          {[
            {
              title: "Protein",
              desc: "Essential for muscle growth and repair.",
            },
            {
              title: "Carbs",
              desc: "The primary energy source for workouts and daily activities.",
            },
            {
              title: "Fats",
              desc: "Necessary for hormone production and brain function.",
            },
          ].map((macro, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{macro.title}</h3>
              <p className="card-text">{macro.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Healthy Food Choices */}
      <section className="section">
        <h2 className="section-title">Healthy Food Choices</h2>
        <div className="grid-container grid-4">
          {[
            {
              title: "Fruits",
              desc: "Rich in vitamins, minerals, and antioxidants.",
            },
            {
              title: "Vegetables",
              desc: "Low in calories and high in fiber for gut health.",
            },
            {
              title: "Proteins",
              desc: "Eggs, chicken, fish, and plant-based proteins for muscle building.",
            },
            {
              title: "Whole Grains",
              desc: "Great source of fiber, keeping you full for longer.",
            },
          ].map((food, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{food.title}</h3>
              <p className="card-text">{food.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
