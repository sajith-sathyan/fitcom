import React, { useState } from "react";
import SearchInput from "../../input/SearchBox/SearchInput";
import RangeSliderBar from "../../bar/RangeSliderBar/RangeSliderBar";
import "./Style.css";
import { api, NutritionService } from "../../../api/authApi";

function NutritionCalculator() {
  const [selectedGoal, setSelectedGoal] = useState("Weight Loss");
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [calories, setCalories] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleSearchIconClick = (value) => {
    fetchNutritionData(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    fetchNutritionData(suggestion); // Trigger API call
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await api.get(`${NutritionService}/suggestions`, {
        params: { query },
      });

      const suggestionsList = res.data.suggestionsArray || [];
      setSuggestions(suggestionsList);
    } catch (error) {
      console.error("Suggestion fetch error:", error);
      setSuggestions([]);
    }
  };

  const fetchNutritionData = async (searchTerm) => {
    try {
      const res = await api.get(`${NutritionService}/fetchNutrition`, {
        params: { searchTerm },
      });

      const result = res.data.nutrition;
      const formattedData = result.data.map((item) => ({
        name: item.name,
        value: Number(item.value),
      }));

      setData(formattedData);
      setCalories(result.calories || 0);
    } catch (error) {
      console.error("USDA API Error:", error);
      setData([]);
      setCalories(0);
    }
  };

  const getNutrientValue = (name) => {
    const item = data.find((i) => i.name.toLowerCase() === name.toLowerCase());
    return item ? (item.value * quantity).toFixed(1) : "0.0";
  };

  return (
    <div className="page">
      {/* Search Input */}
      <div className="all-workout-container">
        <div className="search-wrapper">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onSearchIconClick={handleSearchIconClick}
          />
          {Array.isArray(suggestions) && suggestions.length > 0 && (
            <ul className="suggestion-list">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Nutrition Container */}
      <div className="nutrition-container">
        {/* Left Side - Input Fields */}
        <div className="nutrition-card">
          <h3>Nutrition Calculator</h3>
          <div className="meal-timing-container">
            <h5>Meal Timing</h5>
            <select
              className="nutrition-select"
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
            >
              {[
                "Breakfast",
                "Mid-Morning Snack",
                "Brunch",
                "Lunch",
                "Afternoon Snack",
                "Dinner",
                "Late Night Snack",
              ].map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>

            {/* Quantity Input */}
            <div className="quantity-container">
              <span className="quantity-label">Quantity</span>
              <div className="input-wrapper">
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            {/* Slider Bar */}
            <RangeSliderBar quantity={quantity} setQuantity={setQuantity} />
            <p>Adjust the quantity of the selected food item</p>
          </div>
        </div>

        {/* Right Side - Nutrition Summary */}
        <div className="nutrition-card-right">
          <div className="total-calories">
            <h5>Total Calories</h5>
            <h2>{(calories * quantity).toFixed(1)} kcal</h2>
            <p>Your total caloric intake</p>
            <br />

            {[
              { label: "Total Protein", name: "Protein" },
              { label: "Total Carbohydrates", name: "Carbohydrate" },
              { label: "Total Fats", name: "Total lipid (fat)" },
            ].map((nutrient) => (
              <div key={nutrient.label} className="nutrition-item">
                <div className="nutrition-text">
                  <h4>{nutrient.label}</h4>
                  <p>Your total {nutrient.label.toLowerCase()} intake</p>
                </div>
                <p className="nutrition-value">
                  {getNutrientValue(nutrient.name)} g
                </p>
              </div>
            ))}

            {/* Diet Optimization Section */}
            <div className="diet-optimization">
              <h3 className="diet-heading">Optimize Your Diet</h3>
              <p>
                Consult with our nutrition experts for a tailored diet plan.
              </p>
              <button className="get-started-btn">Get Started Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionCalculator;
