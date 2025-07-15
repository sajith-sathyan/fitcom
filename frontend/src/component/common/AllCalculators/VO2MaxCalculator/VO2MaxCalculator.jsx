import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi'; // Assuming api is configured

function VO2MaxCalculator() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [time, setTime] = useState(''); // in minutes
    const [heartRate, setHeartRate] = useState('');
    const [gender, setGender] = useState('male');
    const [vo2Max, setVo2Max] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const userId = localStorage.getItem("userId");


    const validateInputs = () => {
        if (!age || age <= 0) {
            setError("Please enter a valid age (greater than 0).");
            return false;
        }
        if (!weight || weight <= 0) {
            setError("Please enter a valid weight (greater than 0).");
            return false;
        }
        if (!time || time <= 0) {
            setError("Please enter a valid time (greater than 0 minutes).");
            return false;
        }
        if (!heartRate || heartRate <= 0) {
            setError("Please enter a valid heart rate (greater than 0).");
            return false;
        }
        return true;
    };

    const calculateVO2Max = async () => {
        if (!validateInputs()) return;

        const data = {
            age: parseInt(age),
            weight: parseFloat(weight),
            time: parseFloat(time),
            heartRate: parseInt(heartRate),
            gender,
            forWhom,
            userId
        };

        try {
            // Make the API call to backend (assuming you're using a backend to calculate)
            const response = await api.post(`${calculatorService}/vo2max`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.vo2Max ) {
                setVo2Max(response.data.vo2Max.toFixed(2));
                setMessage(response.data.message);
            } 
        } catch (error) {
            console.error('Error calculating VO2 Max:', error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="calculator">
            <h3>VO₂ Max (Cardio Fitness) Calculator</h3>
            <p className="description">
                VO₂ Max is the maximum amount of oxygen your body can use during intense exercise — a key indicator of cardiovascular fitness.
                This calculator uses the Rockport Walk Test to estimate your VO₂ Max.
                Simply enter your age, weight, time to walk 1 mile (in minutes), and heart rate at the end of the walk.
            </p>

            {error && <p className="error-text">{error}</p>}
            {vo2Max && <p className="result-text">Estimated VO₂ Max: {vo2Max} ml/kg/min</p>}
            {message && <p className="bmi-message">{message}</p>}

            <input
                type="number"
                placeholder="Age (years)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input-field"
            />
            <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-field"
            />
            <input
                type="number"
                placeholder="Time to walk 1 mile (minutes)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field"
            />
            <input
                type="number"
                placeholder="Heart rate after walk (bpm)"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="input-field"
            />

            <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-input">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="forWhom"
                        value="me"
                        checked={forWhom === 'me'}
                        onChange={() => setForWhom('me')}
                    />
                    For Myself
                </label>
                <label>
                    <input
                        type="radio"
                        name="forWhom"
                        value="someoneElse"
                        checked={forWhom === 'someoneElse'}
                        onChange={() => setForWhom('someoneElse')}
                    />
                    For Someone Else
                </label>
            </div>

            {forWhom === 'me' && (
                <p className="warning-text">
                    ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your IBW for recommendations.
                </p>
            )}
            <button onClick={calculateVO2Max} className="button">Calculate VO₂ Max</button>
        </div>
    );
}

export default VO2MaxCalculator;
