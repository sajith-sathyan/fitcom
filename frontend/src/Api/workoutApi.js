import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises/target/';

const fetchWorkouts = async (target = 'abductors') => {
    const options = {
        method: 'GET',
        url: `${API_URL}${target}`,
        headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return [];
    }
};

export default fetchWorkouts;
