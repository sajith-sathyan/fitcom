import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import fetchWorkouts from '../Api/workoutApi';

function AllWorkout() {
    const [searchTerm, setSearchTerm] = useState('');
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const getWorkouts = async () => {
            const data = await fetchWorkouts();
            setWorkouts(data);
        };

        getWorkouts();
    }, []);

    const handleSearch = async (value) => {
        setSearchTerm(value);
        const data = await fetchWorkouts(value);
        console.log(data);
        setWorkouts(data);
    };
  
    return (
        <div className="all-workout-container">
            <SearchBox onSearch={handleSearch} />
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>{workout.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default AllWorkout;
