import React, { useState, useEffect } from "react";
// import "./Style.css";

function TestBuild() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "wU12XUOafd9S9l6XaEBD8ueX1uIqVaqyUwSN2Ew2";

  // Debounce: call suggest API 500ms after user stops typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.length > 1) fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&api_key=${API_KEY}`
      );
      const data = await res.json();
      if (data.foods) {
        const names = data.foods.map((food) => food.description);
        setSuggestions(names.slice(0, 5)); // show only top 5
      }
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearch(name);
    setSuggestions([]);
    handleSearch(name);
  };

  const handleSearch = async (value) => {
    const query = value || search;
    setLoading(true);
    setNutrients([]);
    setFoodName("");

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}`
      );
      const data = await res.json();

      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        setFoodName(food.description);

        const filtered = food.foodNutrients.map((n) => ({
          name: n.nutrientName,
          value: n.value,
          unit: n.unitName,
        }));

        setNutrients(filtered);
      } else {
        alert("No food found.");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Nutrition Finder</h1>
      <div className="input-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter food name"
        />
        <button onClick={() => handleSearch()}>Search</button>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {foodName && <h2>Nutrition for: {foodName}</h2>}

      <ul>
        {nutrients.map((item, index) => (
          <li key={index}>
            {item.name}: {item.value} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestBuild;
  