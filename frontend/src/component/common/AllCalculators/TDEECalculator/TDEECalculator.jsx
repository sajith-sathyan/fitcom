import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function TDEECalculator() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('1.2');
    const [tdee, setTdee] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('')
    const [forWhom, setForWhom] = useState('someoneElse');
    const userId = localStorage.getItem("userId");


    const validateInputs = () => {
        if (!age || !weight || !height) {
            return 'All fields are required.';
        }

        if (age <= 0 || age > 120) {
            return 'Please enter a valid age (1–120 years).';
        }

        if (height < 50 || height > 272) {
            return 'Height should be between 50 cm and 272 cm.';
        }

        if (weight < 2 || weight > 635) {
            return 'Weight should be between 2 kg and 635 kg.';
        }

        return '';
    };

    const calculateTDEE = async () => {
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            setTdee(null);
            setMessage('');
            return;
        }

        setError('');

        try {
            const response = await api.post(`${calculatorService}/tdee`, {
                age: Number(age),
                weight: Number(weight),
                height: Number(height),
                gender,
                forWhom,
                activityLevel: parseFloat(activityLevel),
                userId
            });

            const data = response.data;

            setTdee(data.tdee); 
            setMessage(data.message);
            setInfo(data.info)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to connect to the server.');
            }
            setTdee(null);
            setMessage('');
        }
    };

    return (
        <div>
            <div className="calculator">
                <h3>TDEE (Total Daily Energy Expenditure) Calculator</h3>
                <p className="description">
                    TDEE estimates how many calories your body burns each day based on your activity level.
                    It's useful for planning weight loss, maintenance, or muscle gain.
                </p>
                {error && <p className="error">{error}</p>}



                {tdee && <p className="result-text">Your TDEE: {tdee} kcal/day</p>}
                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}
                {error && <p className="error">{error}</p>}


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
                    <option value="1.9">Super active (very intense workouts or physical job)</option>
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
                        ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your BMR for recommendations.
                    </p>
                )}


                <button onClick={calculateTDEE} className="button">Calculate TDEE</button>

                {tdee && (
                    <div className="result-box">
                        <p className="result"><strong>Your TDEE:</strong> {tdee} kcal/day</p>
                        <p className="message">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TDEECalculator;
