import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function CalorieNeedsCalculator() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('1.2');
    const [calories, setCalories] = useState(null);
    const [error, setError] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [info, setInfo] = useState('')
     const [message, setMessage] = useState('');
    
    const userId = localStorage.getItem("userId");


    const validateInputs = () => {
        const ageNum = Number(age);
        const weightNum = Number(weight);
        const heightNum = Number(height);

        if (!age || !weight || !height) {
            setError('Please fill in all the fields.');
            return false;
        }

        if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
            setError('Age, weight, and height must be valid numbers.');
            return false;
        }

        if (ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
            setError('Please enter positive values for age, weight, and height.');
            return false;
        }

        if (ageNum > 120) {
            setError('Please enter a valid age below 120.');
            return false;
        }

        if (heightNum > 300) {
            setError('Please enter a valid height below 300 cm.');
            return false;
        }

        if (weightNum > 500) {
            setError('Please enter a valid weight below 500 kg.');
            return false;
        }

        setError('');
        return true;
    };


    const calculateCalories = async () => {
        if (!validateInputs()) return;

        try {
            const response = await api.post(`${calculatorService}/calorie-needs`, {
                age: Number(age),
                weight: Number(weight),
                height: Number(height),
                gender,
                activityLevel: parseFloat(activityLevel),
                forWhom,
                userId,
                unit: 'Weight (kg),Height (cm)', // optional, depending on your backend schema
            });
            const {calorieNeed,message,info} = response.data
            console.log(response.data)
            setCalories(calorieNeed);
            setMessage(message)
            setInfo(info)
            
        } catch (err) {
            console.error('API error:', err);
            setError('Failed to calculate calories. Please try again later.');
        }
    };

    return (
        <div>
            <div className="calculator">
                <h3>Calorie Needs (TDEE) Calculator</h3>
                <p className="description">
                    Calorie Needs or TDEE estimates how many calories your body needs each day based on your activity level. It’s helpful for planning your diet and achieving fitness goals.
                </p>

                {error && <p className="error">{error}</p>}
                {calories && <p className="result-text">Your Daily Calorie Needs: {calories} kcal/day</p>}
                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}

                <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input
                    type="number"
                    placeholder="Age (years)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field"
                />

                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="select-input">
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">Lightly active (1–3 days/week)</option>
                    <option value="1.55">Moderately active (3–5 days/week)</option>
                    <option value="1.725">Very active (6–7 days/week)</option>
                    <option value="1.9">Super active (physical job + training)</option>
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
                        ⚠️ This result will be saved and used for workout & diet personalization.
                    </p>
                )}

                <button onClick={calculateCalories} className="button">Calculate Calorie Needs</button>

            </div>
        </div>
    );
}

export default CalorieNeedsCalculator;
