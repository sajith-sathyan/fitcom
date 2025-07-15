import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function ProteinRequirementCalculator() {
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('1.0');
    const [proteinNeed, setProteinNeed] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');

    const userId = localStorage.getItem("userId");

    const validateInputs = () => {
        const weightNum = Number(weight);

        if (!weight) {
            setError('Please enter your weight.');
            return false;
        }

        if (isNaN(weightNum) || weightNum <= 0 || weightNum > 300) {
            setError('Please enter a valid weight between 1 and 300 kg.');
            return false;
        }

        setError('');
        return true;
    };

    const calculateProteinNeeds = async () => {
        if (!validateInputs()) return;

        try {
            const response = await api.post(`${calculatorService}/protein-requirement`, {
                weight: Number(weight),
                activityLevel: parseFloat(activityLevel),
                userId,
                forWhom,
            });

            const { proteinNeed, message } = response.data;
            setProteinNeed(proteinNeed);
            setMessage(message);
        } catch (err) {
            console.error('API error:', err);
            setError('Failed to calculate protein requirement. Please try again later.');
        }
    };

    return (
        <div className="calculator">
            <h3>Protein Requirement Calculator</h3>
            <p className="description">
                Estimate your daily protein needs based on your body weight and activity level. Protein is essential for muscle repair, immune function, and overall health.
            </p>

            {proteinNeed && (
                <p className="result-text">Daily Protein Requirement: {proteinNeed} g</p>
            )}
            {error && <p className="error">{error}</p>}
            {message && <p className="bmi-message">{message}</p>}


            <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="0.8">Sedentary (0.8g/kg)</option>
                <option value="1.0">Light activity (1.0g/kg)</option>
                <option value="1.2">Moderate activity (1.2g/kg)</option>
                <option value="1.6">Heavy training (1.6g/kg)</option>
                <option value="2.0">Intense training/bodybuilding (2.0g/kg)</option>
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
                    ⚠️ This result will be saved and used for workout personalization.
                </p>
            )}

            <button onClick={calculateProteinNeeds}>Calculate Protein Needs</button>
        </div>
    );
}

export default ProteinRequirementCalculator;
