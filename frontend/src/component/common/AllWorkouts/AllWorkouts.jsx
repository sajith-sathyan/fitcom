import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import SearchInput from "../../input/SearchBox/SearchInput";

function ExerciseCard({ exercise }) {
  return (
    <div className="exercise-card">
      <img src={exercise.gifUrl} alt={exercise.name} className="exercise-img" />
      <h3>{exercise.name}</h3>
      <p>
        <strong>Body Part:</strong> {exercise.bodyPart}
      </p>
      <p>
        <strong>Equipment:</strong> {exercise.equipment}
      </p>
    </div>
  );
}

function AllWorkouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://exercisedb.p.rapidapi.com/exercises/target/abductors",
          {
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
              "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            },
          }
        );
        setExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page">
        <div className="all-workout-container">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="exercise-list">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllWorkouts;
