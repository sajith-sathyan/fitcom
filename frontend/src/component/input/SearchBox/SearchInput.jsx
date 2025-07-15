import React from "react";
import "./Style.css";

function SearchInput({ searchTerm, onSearch, onSearchIconClick }) {
  const handleChange = (event) => {
    onSearch(event.target.value); 
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleIconClick = () => {
    if (onSearchIconClick) {
      onSearchIconClick(searchTerm); // Notify parent with current searchTerm
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-box-input"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <svg
        className="search-box-icon"
        onClick={handleIconClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
        style={{ cursor: "pointer" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.35-1.35z"
        />
      </svg>
    </div>
  );
}

export default SearchInput;
