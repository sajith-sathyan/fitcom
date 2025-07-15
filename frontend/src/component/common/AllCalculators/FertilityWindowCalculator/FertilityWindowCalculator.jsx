import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi'; // Adjust path as needed

function FertilityWindowCalculator() {
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState('');
    const [fertileWindow, setFertileWindow] = useState(null);
    const [error, setError] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
      const [info, setInfo] = useState('');
    
    const userId = localStorage.getItem('userId');
  const [message, setMessage] = useState('');

    const validateInputs = () => {
        const cycle = parseInt(cycleLength);

        if (!lastPeriod || !cycleLength) {
            setError('Please fill in all fields.');
            return false;
        }

        if (isNaN(cycle) || cycle < 21 || cycle > 35) {
            setError('Cycle length should be between 21 and 35 days.');
            return false;
        }

        setError('');
        return true;
    };

    const calculateFertileWindow = async () => {
        if (!validateInputs()) return;

        try {
            const response = await api.post(`${calculatorService}/fertility-window`, {
                lastPeriod,
                cycleLength: Number(cycleLength),
                userId,
                forWhom
            });
        
            const { start, end, ovulation, message } = response.data;
        console.log(response.data)
            setFertileWindow({ start, end, ovulation });
            setMessage(message);
        } catch (err) {
            console.error('API error:', err);
            setError('Failed to calculate fertile window. Please try again later.');
        }
        
    };

    return (
        <div>
            <div className="calculator">
                <h3>Best Time to Get Pregnant</h3>
                <p className="description">
                    Estimate your most fertile window—the best time to try for pregnancy—based on your last period start date and the average length of your menstrual cycle.
                    <br /><br />
                    <strong>What is Average Cycle Length?</strong> It’s the number of days from the first day of your period to the day before your next period starts.
                    For most women, this is about 28 days, but it can range anywhere from 21 to 35 days.
                </p>

                {fertileWindow && (
                    <div className="result">
                        <p className='result-text'><strong>Fertile Window:</strong> {fertileWindow.start} – {fertileWindow.end}</p>
                        <p className='result-text'><strong>Estimated Ovulation Day:</strong> {fertileWindow.ovulation}</p>
                        <p className='bmi-message' >{message}</p>
                        <p className="info">{info}</p>
                    </div>
                )}


                {error && <p className="error">{error}</p>}

                <input
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    placeholder="Last Period Start Date"
                />

                <input
                    type="number"
                    value={cycleLength}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) { // Allow only numeric values
                            setCycleLength(value);
                        }
                    }}
                    placeholder="Average Cycle Length (in days)"
                    min="21"
                    max="35"
                />


                <button onClick={calculateFertileWindow}>Calculate Fertile Window</button>
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

            </div>
        </div>
    );
}

export default FertilityWindowCalculator;
