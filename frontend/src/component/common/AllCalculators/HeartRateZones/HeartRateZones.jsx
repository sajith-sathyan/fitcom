import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function HeartRateZones() {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [zones, setZones] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [forWhom, setForWhom] = useState('someoneElse');

  const userId = localStorage.getItem("userId");

  const validateInputs = () => {
    const ageNum = Number(age);
    const rhrNum = Number(restingHR);

    if (!age || !restingHR) {
      setError('Please fill in all the fields.');
      return false;
    }

    if (isNaN(ageNum) || isNaN(rhrNum)) {
      setError('Age and resting heart rate must be valid numbers.');
      return false;
    }

    if (ageNum <= 0 || rhrNum <= 0) {
      setError('Please enter positive values.');
      return false;
    }

    if (ageNum > 120 || rhrNum > 150) {
      setError('Please enter realistic values.');
      return false;
    }

    setError('');
    return true;
  };

  const calculateHeartRateZones = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${calculatorService}/heart-rate-zones`, {
        age: Number(age),
        restingHeartRate: Number(restingHR),
        forWhom,
        userId,
      });

      const { zones: zoneData, message, info } = response.data;
      setZones(zoneData);
      setMessage(message);
      setInfo(info);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to calculate heart rate zones. Please try again later.');
    }
  };

  return (
    <div>
      <div className="calculator">
        <h3>Heart Rate Zones Calculator</h3>
        <p className="description">
          Estimate your optimal heart rate training zones using your age and resting heart rate.
        </p>

        {zones && (
          <div className="zone-table">
            {zones.map((zone, index) => (
              <div key={index} className="zone-row">
                <span className="zone-label">{zone.label}</span>
                <span className="zone-bpm">{zone.bpmMin}–{zone.bpmMax} bpm</span>
              </div>
            ))}
          </div>
        )}

        {error && <p className="error">{error}</p>}
        {message && <p className="bmi-message">{message}{` [${info}]`}</p>}

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="Resting Heart Rate (bpm)"
          value={restingHR}
          onChange={(e) => setRestingHR(e.target.value)}
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
            ⚠️ This result will be saved and used for workout personalization.
          </p>
        )}

        <button onClick={calculateHeartRateZones}>Calculate Zones</button>

       
      </div>
    </div>
  );
}

export default HeartRateZones;
