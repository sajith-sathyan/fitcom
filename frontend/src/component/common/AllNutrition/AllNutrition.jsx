  import React, { useState } from "react";
  import SearchInput from "../../input/SearchBox/SearchInput";
  import "./Style.css";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  import { api, NutritionService } from "../../../api/authApi";

  function AllNutrition() {
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

    return (
      <div className="page">
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

        {data.length &&(<>
          <h1>
          {searchTerm ? `${searchTerm} has total` : "Selected food has total"}{" "}
          <span>{calories.toFixed(1)} calories</span>
        </h1>

        <div className="nutrition-container">
          <div className="nutrition-card">
            <h3>Nutritional Values</h3>
            {data.map((item, index) => (
              <button className="black-border-buttons" key={index}>
                <span className="nutrition-name">{item.name}</span>
                <span className="nutrition-name">{item.value}g</span>
              </button>
            ))}
          </div>

          <div className="nutrition-card-right">
            <p>To burn {calories.toFixed(1)} calories you will have to:</p>
            {[...Array(4)].map((_, i) => (
              <div className="image-text-container" key={i}>
                <div className="image-content">
                  <img
                    src="https://www.svgrepo.com/show/189351/running-run.svg"
                    alt="Running Icon"
                  />
                </div>
                <div className="text-content">
                  <p>
                    Run approximately {Math.ceil(calories / 100) * 10} minutes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h2>Nutritional Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#008080" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </>)}
      </div>
    );
  }

  export default AllNutrition;
