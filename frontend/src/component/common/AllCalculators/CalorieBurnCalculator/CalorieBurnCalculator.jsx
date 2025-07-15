import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function CalorieBurnCalculator() {
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [activity, setActivity] = useState('walking');
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');

  const userId = localStorage.getItem('userId');

  const validateInputs = () => {
    const weightNum = Number(weight);
    const durationNum = Number(duration);

    if (!weight || !duration || !activity) {
      setError('Please fill in all the fields.');
      return false;
    }

    if (isNaN(weightNum) || isNaN(durationNum)) {
      setError('Weight and duration must be valid numbers.');
      return false;
    }

    if (weightNum <= 0 || durationNum <= 0) {
      setError('Please enter positive values for weight and duration.');
      return false;
    }

    if (weightNum > 500) {
      setError('Please enter a valid weight below 500 kg.');
      return false;
    }

    if (durationNum > 1440) {
      setError('Duration should be less than 1440 minutes (24 hours).');
      return false;
    }

    setError('');
    return true;
  };

  const calculateCalories = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${calculatorService}/calorie-burn`, {
        weight: Number(weight),
        duration: Number(duration),
        activity,
        userId,
        forWhom,
        unit: 'Weight (kg), Duration (min)',
      });

      const { calories, message, info } = response.data;
      setCaloriesBurned(calories);
      setMessage(message);
      setInfo(info);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to calculate calories burned. Please try again later.');
    }
  };

  return (
    <div className="calculator">
      <h3>Calorie Burn per Activity</h3>
      <p className="description">
        Estimate how many calories you burn during different activities. Enter your weight, activity duration, and select the activity type.
      </p>

      {error && <p className="error">{error}</p>}
      {caloriesBurned && <p className="result-text">Estimated Calories Burned: {caloriesBurned} kcal</p>}
      {message && <p className="bmi-message">{message}</p>}

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="input-field"
      />

      <select value={activity} onChange={(e) => setActivity(e.target.value)} className="select-input">
        <option value="walking">Walking</option>
        <option value="running">Running</option>
        <option value="cycling">Cycling</option>
        <option value="swimming">Swimming</option>
        <option value="yoga">Yoga</option>
        <option value="weightlifting">Weightlifting</option>
        <option value="aerobics">Aerobics</option>
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

      <button onClick={calculateCalories} className="button">
        Calculate Calories Burned
      </button>
    </div>
  );
}

export default CalorieBurnCalculator;
