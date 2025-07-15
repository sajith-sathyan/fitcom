import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi'; // Import API utility

function LeanBodyMassCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [lbm, setLbm] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');

  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  const validateInputs = () => {
    if (!weight || !height || !gender) {
      return 'Please fill in all required fields.';
    }

    const weightVal = +weight;
    const heightVal = +height;

    // Range checks (in kg and cm)
    if (weightVal <= 0 || weightVal > 300) return 'Weight must be between 1 kg and 300 kg.';
    if (heightVal <= 0 || heightVal > 272) return 'Height must be between 1 cm and 272 cm.';

    return null;
  };

  const calculateAndSubmitLBM = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLbm(null);
      setMessage('');
      return;
    }

    try {
      const response = await api.post(`${calculatorService}/leanbodymass`, {
        userId,
        gender,
        weight: +weight,
        height: +height,
        forWhom,
        unit: 'Weight in kg, Height in cm',
      });

      const { lbm, message } = response.data;
      setLbm(lbm);
      setMessage(message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate or submit LBM.');
      setLbm(null);
      setMessage('');
    }
  };

  return (
    <div>
      <div className="calculator">
        <h3>Lean Body Mass (LBM) Calculator</h3>
        <p className="description">
          Lean Body Mass (LBM) refers to the weight of everything in the body except fat. Knowing your LBM can help in determining calorie needs and planning muscle-building goals.
        </p>

        {error && <p className="error-text">{error}</p>}
        {lbm && <p className="result-text">Your Lean Body Mass: {lbm} kg</p>}
        {message && <p className="bmi-message">{message}</p>}

        <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-input">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
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
            ⚠️ This result will be saved and used for workout & diet personalization.
          </p>
        )}

        <button onClick={calculateAndSubmitLBM} className="button">Calculate LBM</button>
      </div>
    </div>
  );
}

export default LeanBodyMassCalculator;
