import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm); // Send input to parent when Enter is pressed
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className={`search-container ${searchTerm ? "active" : ""}`}>
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-input" // ✅ Add this line
      />
      {searchTerm && (
        <button className="clear-button" onClick={clearSearch}>
          ✖
        </button>
      )}
    </div>
  );
}

export default SearchBox;
