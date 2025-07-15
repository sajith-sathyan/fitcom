import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function IdealBodyWeightCalculator() {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');
  const [ibw, setIbw] = useState(null);
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const userId = localStorage.getItem("userId");

  const validateInputs = () => {
    const h = parseFloat(height);
    if (!h || h < 100 || h > 272) {
      setError("Height should be between 100 cm and 272 cm.");
      return false;
    }

    if (gender !== "male" && gender !== "female") {
      setError("Please select a valid gender.");
      return false;
    }

    return true;
  };

  const calculateIBW = async () => {
    if (!validateInputs()) return;
    setError('');

    const data = {
      height: parseFloat(height),
      gender,
      forWhom,
      userId,
    };

    try {
      const response = await api.post(`${calculatorService}/ibw`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  

      console.log(response.data)

      if (response.data.ibw === 0) {
        setError("Invalid IBW calculation.");
        setIbw(null);
      } else {
        setIbw(response.data.ibw);
        setMessage(response.data.message);
        setInfo(response.data.info);
      }
    } catch (error) {
      console.error('Error calculating IBW:', error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="calculator">
      <h3>Ideal Body Weight (IBW) Calculator</h3>
      <p className="description">
        Ideal body weight (IBW) is an estimate of what a person's weight should be based on their height and gender.
        This calculator uses the Devine formula for more accuracy.
      </p>

      {ibw && <p className="result-text">Your Ideal Body Weight: {ibw} kg</p>}
      {message && <p className="bmi-message">{message}{` [${info}]`}</p>}
      {error && <p className="error-text">{error}</p>}

      <input
        type="number"
        placeholder="Enter your height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="input-field"
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-input">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
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
          ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your IBW for recommendations.
        </p>
      )}

      <button onClick={calculateIBW} className="button">Calculate IBW</button>
    </div>
  );
}

export default IdealBodyWeightCalculator;
