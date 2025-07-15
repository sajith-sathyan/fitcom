import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function GlycemicLoadCalculator() {
  const [gi, setGi] = useState('');
  const [carbs, setCarbs] = useState('');
  const [glycemicLoad, setGlycemicLoad] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');
  const userId = localStorage.getItem("userId");

  const validateInputs = () => {
    const giValue = parseFloat(gi);
    const carbsValue = parseFloat(carbs);

    if (!gi || giValue <= 0 || giValue > 150 || isNaN(giValue)) {
      setError('Please enter a valid Glycemic Index (1 - 150).');
      return false;
    }

    if (!carbs || carbsValue <= 0 || carbsValue > 300 || isNaN(carbsValue)) {
      setError('Please enter valid carbohydrate amount (1 - 300 grams).');
      return false;
    }

    setError('');
    return true;
  };

  const calculateGlycemicLoad = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${calculatorService}/glycemic-load`, {
        gi: parseFloat(gi),
        carbs: parseFloat(carbs),
        userId,
        forWhom
      });

      const { glycemicLoad, message, info } = response.data;

      setGlycemicLoad(glycemicLoad);
      setMessage(message || '');
      setInfo(info || '');
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to calculate Glycemic Load. Please try again later.');
    }
  };

  return (
    <div className="calculator">
      <h3>Glycemic Load Calculator</h3>
      <p className="description">
        Glycemic Load (GL) estimates how much a food will raise your blood sugar. It considers both the Glycemic Index (GI) and the carbohydrate content.
      </p>

      <input
        type="number"
        placeholder="Glycemic Index (GI)"
        value={gi}
        onChange={(e) => setGi(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Carbohydrates (grams)"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
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
          ⚠️ This result will be saved and used for personalized nutrition insights.
        </p>
      )}

      <button onClick={calculateGlycemicLoad} className="button">Calculate Glycemic Load</button>

      {error && <p className="error">{error}</p>}
      {glycemicLoad !== null && <p className="result">Your Glycemic Load: {glycemicLoad}</p>}
      {message && <p className="bmi-message">{message}</p>}
      {info && <p className="info-text">{info}</p>}
    </div>
  );
}

export default GlycemicLoadCalculator;
