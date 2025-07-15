import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi'; // Adjust path as needed

function StepToCalorieConverter() {
    const [steps, setSteps] = useState('');
    const [weight, setWeight] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(null);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('userId');

    const validateInputs = () => {
        const stepsNum = Number(steps);
        const weightNum = Number(weight);

        if (!steps || !weight) {
            setError('Please enter both steps and weight.');
            return false;
        }

        if (isNaN(stepsNum) || isNaN(weightNum)) {
            setError('Steps and weight must be numbers.');
            return false;
        }

        if (stepsNum <= 0 || weightNum <= 0) {
            setError('Values must be greater than zero.');
            return false;
        }

        if (stepsNum > 100000 || weightNum > 300) {
            setError('Please enter realistic values.');
            return false;
        }

        setError('');
        return true;
    };

    const calculateCalories = async () => {
        if (!validateInputs()) return;

        try {
            const response = await api.post(`${calculatorService}/step-to-calorie`, {
                steps: Number(steps),
                weight: Number(weight),
                userId,
                forWhom
            });
            const {calories,message,info} = response.data


            setCaloriesBurned(calories.toFixed(2));
            setMessage(message)
            setInfo(info)
            
        } catch (err) {
            console.error('API error:', err);
            setError('Failed to calculate calories. Please try again later.');
        }
    };

    return (
        <div className="calculator">
            <h3>Step-to-Calorie Converter</h3>
            <p className="description">
                Estimate how many calories you burn based on your step count and body weight.
                On average, a person burns about 0.04 kcal per step per kilogram of body weight.
            </p>

            {error && <p className="error">{error}</p>}
            {error && <p className="error-text">{error}</p>}
                {caloriesBurned && <p className="result-text">Estimated Calories Burned: {caloriesBurned} kcal</p>}
                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}

            <input
                type="number"
                placeholder="Steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
            />

            <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
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
                    ⚠️ This result will be saved and used for workout & diet personalization.
                </p>
            )}

            <button onClick={calculateCalories}>Calculate Calories Burned</button>
        </div>
    );
}

export default StepToCalorieConverter;
