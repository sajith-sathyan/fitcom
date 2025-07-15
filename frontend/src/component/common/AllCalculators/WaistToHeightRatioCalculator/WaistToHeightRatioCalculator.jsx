import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function WaistToHeightRatioCalculator() {
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [ratio, setRatio] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');
  const userId = localStorage.getItem("userId");

  const validateInputs = () => {
    const w = parseFloat(waist);
    const h = parseFloat(height);

    if (!w || w < 30 || w > 200) {
      setError("Waist circumference should be between 30 cm and 200 cm.");
      return false;
    }

    if (!h || h < 100 || h > 272) {
      setError("Height should be between 100 cm and 272 cm.");
      return false;
    }

    return true;
  };

  const calculateWHtR = async () => {
    if (!validateInputs()) return;
    setError('');

    const data = {
      waist: parseFloat(waist),
      height: parseFloat(height),
      forWhom,
      userId,
    };

    try {
      const response = await api.post(`${calculatorService}/whtr`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const {whtr,category,message,info} = response.data;
      if (whtr) {
        setRatio(whtr);
        setCategory(category);
        setMessage(message);
        setInfo(info);
      } else {
        setError("Invalid WHtR calculation.");
      }
    } catch (error) {
      console.error("Error calculating WHtR:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="calculator">
      <h3>Waist-to-Height Ratio Calculator</h3>
      <p className="description">
        This ratio helps assess health risks related to fat distribution. A value under 0.5 is generally considered healthy.
      </p>

      {ratio && (
       <div className="result-text" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <p className='result-text'><strong>Waist-to-Height Ratio:</strong> {ratio}</p>
       <p className='result-text'><strong>Category:</strong> {category}</p>
       <p className='bmi-message'>{message}{`${info}`}</p>
     </div>
     
      )}

      {error && <p className="error-text">{error}</p>}

      <input
        type="number"
        placeholder="Waist circumference (cm)"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
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
          ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your WHtR for recommendations.
        </p>
      )}

      <button onClick={calculateWHtR} className="button">Calculate WHtR</button>
    </div>
  );
}

export default WaistToHeightRatioCalculator;
