import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function OneRepMaxCalculator() {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [oneRepMax, setOneRepMax] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [info,setInfo]=useState('')
    
    const userId = localStorage.getItem("userId");

    const validateInputs = () => {
        if (!weight || !reps) {
            return "Weight and reps are required.";
        }

        const numericWeight = Number(weight);
        const numericReps = Number(reps);

        if (isNaN(numericWeight) || isNaN(numericReps)) {
            return "Inputs must be valid numbers.";
        }

        if (numericWeight <= 0 || numericWeight > 635) {
            return "Weight should be between 1 kg and 635 kg.";
        }

        if (numericReps <= 0 || numericReps > 100) {
            return "Reps should be between 1 and 100.";
        }

        return null;
    };

    const calculateOneRepMax = async () => {
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            setOneRepMax(null);
            setMessage('');
            return;
        }

        setError('');

        try {
            const response = await api.post(`${calculatorService}/onerepmax`, {
                weight: Number(weight),
                reps: Number(reps),
                forWhom,
                userId,
                calculationType: 'oneRepMax'
            });

            const { oneRepMax, message,info } = response.data;

            setOneRepMax(oneRepMax);
            setMessage(message);
            setInfo(info)
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to calculate 1RM.');
            setOneRepMax(null);
            setMessage('');
        }
    };

    return (
        <div>
            <div className="calculator">
                <h3>1RM (One-Rep Max) Calculator</h3>
                <p className="description">
                    This calculator estimates your maximum lift for a single repetition based on how much weight you can lift for a given number of reps.
                </p>
                {error && <p className="error-text">{error}</p>}
                {oneRepMax && <p className="result-text">Your 1RM: {oneRepMax} kg</p>}
                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}

              


                <input
                    type="number"
                    placeholder="Weight lifted (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Reps performed"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="input-field"
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
                        ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your 1RM for recommendations.
                    </p>
                )}

                <button onClick={calculateOneRepMax} className="button">Calculate 1RM</button>
            </div>
        </div>
    );
}

export default OneRepMaxCalculator;
