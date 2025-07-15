import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function BasalMetabolicRate() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [bmr, setBmr] = useState(null);
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [info,setInfo]=useState('')
    const userId = localStorage.getItem("userId");

    const validateInputs = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const a = parseInt(age);

        if (!h || h < 50 || h > 272) {
            setErrMessage("Height should be between 50 cm and 272 cm.");
            return false;
        }

        if (!w || w < 2 || w > 635) {
            setErrMessage("Weight should be between 2 kg and 635 kg.");
            return false;
        }

        if (!a || a < 1 || a > 120) {
            setErrMessage("Age should be between 1 and 120 years.");
            return false;
        }

        if (gender !== "male" && gender !== "female") {
            setErrMessage("Please select a valid gender.");
            return false;
        }

        return true;
    };

    const calculateBMR = async () => {
        if (!validateInputs()) return;
        setErrMessage('');

        const data = {
            height: parseFloat(height),
            weight: parseFloat(weight),
            forWhom,
            age: parseInt(age),
            gender,
            userId,
        };

        try {
            const response = await api.post(`${calculatorService}/bmr`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            if (response.data.bmr === 0) {
                setErrMessage("Invalid BMR calculation.");
                setBmr(null);
            } else {
                setBmr(response.data.bmr);
                setMessage(response.data.message);
                setInfo(response.data.info)
            }
        } catch (error) {
            console.error('Error calculating BMR:', error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="calculator">
            <h3>Basal Metabolic Rate (BMR) Calculator</h3>
            <p className="description">
                BMR (Basal Metabolic Rate) tells you how many calories your body burns at rest to keep vital functions going—like breathing and maintaining body temperature. We calculate it using the Mifflin-St Jeor Equation, one of the most accurate methods available.
            </p>


            {bmr && <p className="result-text">Your BMR: {bmr} kcal/day</p>}
            {message && <p className="bmi-message">{message}{`[${info}]`}</p>}
            {errMessage && <p className="error-text">{errMessage}</p>}

            <input type="number" placeholder="Age (years)" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />

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
                    ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your BMR for recommendations.
                </p>
            )}

            <button onClick={calculateBMR}>Calculate BMR</button>
        </div>
    );
}

export default BasalMetabolicRate;
