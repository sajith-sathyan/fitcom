import React, { useState } from 'react';
import './Style.css';
import { api, calculatorService } from '../../../../api/authApi';

function BodyMassIndex() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');
    const [forWhom, setForWhom] = useState('someoneElse');
    const [status, setStatus] = useState('');
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



    const calculateBMI = async () => {
        if (!validateInputs()) return;
        setErrMessage('')
        const data = {
            height: parseFloat(height),
            weight: parseFloat(weight),
            forWhom,
            age: parseInt(age),
            gender,
            userId,
        };

        try {
            const response = await api.post(`${calculatorService}/bmi`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('BMI submitted successfully:', response.data);

            if (response.data.bmi === 0) {
                setErrMessage("Invalid BMI value: Height or weight might be missing or zero.");
                setBmi(null);
                setStatus('');
            } else {
                setBmi(response.data.bmi);
                setMessage(response.data.message);
                setBmiMessage(response.data.bmiMessage)
                setStatus(response.data.status);
            }

        } catch (error) {
            console.error('Error submitting BMI:', error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <div className="calculator">
                {/* <p className="bmi-message">{message}</p> */}
                <h3>Body Mass Index (BMI) Calculator</h3>
                <p className="description">
                    BMI is a quick way to estimate whether you are underweight, normal weight, overweight, or obese
                    based on your height and weight. It's commonly used as a general health indicator.
                </p>

                <div className="result-box">
                    {bmi && bmi !== 0 && <p className="result-text">BMI = {bmi} ({status})</p>}
                    {bmi === 0 && <p className="result-text">BMI calculation failed. Please check your inputs.</p>}
                </div>
                {bmiMessage && <p className="bmi-message">{bmiMessage} {`[${message}]`}</p>}

                {errMessage && (<p className="error-text">{errMessage}</p>)}
                <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
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
                        ⚠️ Your selection affects workout and diet plans. Choose "For Myself" to save your BMI for recommendations.
                    </p>
                )}

                <button onClick={calculateBMI}>Calculate BMI</button>
            </div>
        </div>
    );
}

export default BodyMassIndex;
