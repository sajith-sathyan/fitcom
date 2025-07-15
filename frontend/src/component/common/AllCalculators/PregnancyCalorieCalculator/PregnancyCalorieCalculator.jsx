import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function PregnancyCalorieCalculator() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [trimester, setTrimester] = useState('1');
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');

  const userId = localStorage.getItem('userId');

  const validateInputs = () => {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const activityNum = parseFloat(activityLevel);
    const trimesterNum = Number(trimester);
  
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
  
    if (activityNum < 1.2 || activityNum > 1.9) {
      setError('Please select a valid activity level between 1.2 and 1.9.');
      return false;
    }
  
    if (![1, 2, 3].includes(trimesterNum)) {
      setError('Please select a valid trimester (1, 2, or 3).');
      return false;
    }
  
    setError('');
    return true;
  };
  
  const calculateCalories = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${calculatorService}/pregnancy-calories`, {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        activityLevel: parseFloat(activityLevel),
        trimester: Number(trimester),
        userId,
        forWhom,
        unit: 'Weight (kg),Height (cm)',
      });

      const { calorieNeed, message, info } = response.data;
      setCalories(calorieNeed);
      setMessage(message);
      setInfo(info);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to calculate pregnancy calories. Please try again later.');
    }
  };

  return (
    <div>
      <div className="calculator">
        <h3>Pregnancy Calorie Calculator</h3>
        <p className="description">
          Estimate your daily calorie needs during pregnancy based on your age, weight, height, activity level, and trimester.
        </p>

        {error && <p className="error">{error}</p>}
        {calories && <p className="result-text">Estimated Daily Calories: {calories} kcal</p>}
        {message && <p className="bmi-message">{message} </p>}

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

        <select value={trimester} onChange={(e) => setTrimester(e.target.value)} className="select-input">
          <option value="1">1st Trimester</option>
          <option value="2">2nd Trimester (+340 kcal)</option>
          <option value="3">3rd Trimester (+450 kcal)</option>
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

export default PregnancyCalorieCalculator;
