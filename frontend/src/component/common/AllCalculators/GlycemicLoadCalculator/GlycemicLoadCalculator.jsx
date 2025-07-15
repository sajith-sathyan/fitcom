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
    const giVal = parseFloat(gi);
    const carbsVal = parseFloat(carbs);

    if (!gi || isNaN(giVal) || giVal <= 0 || giVal > 150) {
      setError('Please enter a valid GI between 1 and 150.');
      return false;
    }

    if (!carbs || isNaN(carbsVal) || carbsVal <= 0 || carbsVal > 300) {
      setError('Please enter valid carbohydrates between 1 and 300 grams.');
      return false;
    }

    setError('');
    return true;
  };

  const calculateGL = async () => {
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
      {error && <p className="error">{error}</p>}
                {glycemicLoad !== null && <p className="result-text">Your Glycemic Load: {glycemicLoad}</p>}

                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}

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

      <button onClick={calculateGL} className="button">Calculate Glycemic Load</button>

    </div>
  );
}

export default GlycemicLoadCalculator;
