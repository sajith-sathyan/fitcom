import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "../input/SearchBox/SearchInput";
import.meta.env.VITE_YOUR_VARIABLE;

function AllWorkouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/target/abductors",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // fetchData()
  }, []);

  const handleSearch = async (value) => {};
  return (
    <div className="all-workout-container">
      <br />
      <SearchInput onSearch={handleSearch} />
    </div>
  );
}

export default AllWorkouts;
