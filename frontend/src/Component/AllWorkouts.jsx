import React, { useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import axios from 'axios';


function AllWorkouts() {
    const [searchTerm, setSearchTerm] = useState('');
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/target/abductors',
        headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        // fetchData()
    }, []);

    const handleSearch = async (value) => {

    };
    return (
        <div className="all-workout-container">
            <SearchBox onSearch={handleSearch} />
        </div>
    )
}

export default AllWorkouts; 