import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function BodyFatPercentageCalculator() {
    const [height, setHeight] = useState('');
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState('');
    const [gender, setGender] = useState('male');
    const [bfp, setBfp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [info, setInfo] = useState('')

    const userId = localStorage.getItem("userId");

    const validateInputs = () => {
        if (!waist || !neck || !height || !gender) {
            return 'Please fill in all required fields.';
        }

        if (gender === 'female' && !hip) {
            return 'Hip measurement is required for females.';
        }

        const waistVal = +waist;
        const neckVal = +neck;
        const heightVal = +height;
        const hipVal = gender === 'female' ? +hip : null;

        // Range checks (in cm)
        if (waistVal < 20 || waistVal > 200) return 'Waist must be between 20 cm and 200 cm.';
        if (neckVal < 10 || neckVal > 60) return 'Neck must be between 10 cm and 60 cm.';
        if (heightVal < 50 || heightVal > 272) return 'Height must be between 50 cm and 272 cm.';
        if (gender === 'female' && (hipVal < 20 || hipVal > 200)) return 'Hip must be between 20 cm and 200 cm.';

        return null;
    };

    const calculateAndSubmitBFP = async () => {
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            setBfp(null);
            setMessage('');
            return;
        }

        try {
            const response = await api.post(`${calculatorService}/bodyfat`, {
                userId,
                gender,
                waist: +waist,
                neck: +neck,
                height: +height,
                hip: gender === 'female' ? +hip : undefined,
                forWhom,
                unit: 'waist,neck,height are in Centimeter'
            });
            console.log(response.data)
            const { bfp, message, info } = response.data;
            setBfp(bfp);
            setMessage(message);
            setInfo(info)
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to calculate or submit BFP.');
            setBfp(null);
            setMessage('');
        }
    };

    return (
        <div>
            <div className="calculator">
                <h3>Body Fat Percentage Calculator</h3>
                <p className="description">
                    This calculator estimates your body fat percentage using your measurements.
                </p>
                {/* 
                {error && <p className="error-text">{error}</p>}
                {bfp !== null && <p className="result">Your Body Fat Percentage: {bfp}% ({status})</p>}
                {message && <p className="bmi-message">{message}</p>} */}

                {bfp && <p className="result-text">Your BFP: {bfp}% </p>}
                {message && <p className="bmi-message">{message}{`[${info}]`}</p>}
                {error && <p className="error-text">{error}</p>}
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input
                    type="number"
                    placeholder="Waist circumference (cm)"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Neck circumference (cm)"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                    className="input-field"
                />
                {gender === 'female' && (
                    <input
                        type="number"
                        placeholder="Hip circumference (cm)"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        className="input-field"
                    />
                )}
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

                <button onClick={calculateAndSubmitBFP} className="button">Calculate BFP</button>
            </div>
        </div>
    );
}

export default BodyFatPercentageCalculator;
