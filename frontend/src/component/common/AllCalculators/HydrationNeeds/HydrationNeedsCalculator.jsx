import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function CalorieNeedsCalculator() {
  const [weight, setWeight] = useState('');
  const [hydration, sethydration] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem("userId");

  const validateInputs = () => {
    const w = parseFloat(weight);
    if (!w || w < 2 || w > 635) {
      setError("Weight should be between 2 kg and 635 kg.");
      return false;
    }
    return true;
  };

  const calculateCalories = async () => {
    if (!validateInputs()) return;

    setError('');
    const data = {
      weight: parseFloat(weight),
      forWhom,
      userId,
    };

    try {
      const response = await api.post(`${calculatorService}/hydration`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.calorieNeeds === 0) {
        setError("Invalid calorie calculation.");
        sethydration(null);
      } else {
        sethydration(response.data.hydration);
        setMessage(response.data.message || '');
      }

    } catch (err) {
      console.error('Error calculating calorie needs:', err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="calculator">
      <h3>Calorie Needs Calculator</h3>
      <p className="description">
        Estimate how many calories you need per day to maintain your current weight. This helps in planning your diet and fitness routines.
      </p>

      {hydration && <p className="result-text">Your estimated daily calorie needs: {hydration} kcal</p>}
      {message && <p className="bmi-message">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <input
        type="number"
        placeholder="Enter your weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
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
          ⚠️ Selecting "For Myself" will save your calorie data for personalized diet recommendations.
        </p>
      )}

      <button onClick={calculateCalories} className="button">Calculate Calories</button>
    </div>
  );
}

export default CalorieNeedsCalculator;
