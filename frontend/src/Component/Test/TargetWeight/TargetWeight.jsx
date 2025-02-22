import React, { useState, useEffect } from "react";
import './TargetWeight.css'; // Assuming you will add your custom styles here

const TargetWeight = ({ onNext, onBack, targetWeightData }) => {
    const [height, setHeight] = useState(targetWeightData.height || "");    
    const [unit, setUnit] = useState(targetWeightData.unit || "cm");      
    const [weight, setWeight] = useState(targetWeightData.weight || "");    
    const [goalWeight, setGoalWeight] = useState(targetWeightData.goalWeight || ""); 
    const [weightUnit, setWeightUnit] = useState(targetWeightData.weightUnit || "kg");   
    const [goalWeightUnit, setGoalWeightUnit] = useState(targetWeightData.goalWeightUnit || "kg"); // Separate state for goal weight unit
    const [validationMessage, setValidationMessage] = useState(""); // State for validation message

    // Update state whenever targetWeightData changes
    useEffect(() => {
        setHeight(targetWeightData.height || "");
        setUnit(targetWeightData.unit || "cm");
        setWeight(targetWeightData.weight || "");
        setGoalWeight(targetWeightData.goalWeight || "");
        setWeightUnit(targetWeightData.weightUnit || "kg");
        setGoalWeightUnit(targetWeightData.goalWeightUnit || "kg");
    }, [targetWeightData]);

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleUnitChange = (event) => {
        const selectedUnit = event.target.value;

        if (selectedUnit === "ft" && unit === "cm") {
            setHeight((height / 30.48).toFixed(2));
        } else if (selectedUnit === "cm" && unit === "ft") {
            setHeight((height * 30.48).toFixed(2));
        }
        setUnit(selectedUnit); 
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleGoalWeightChange = (event) => {
        setGoalWeight(event.target.value);
    };

    // Validation function
    const validate = () => {
        if (!height || !weight || !goalWeight) {
            setValidationMessage("All fields are required."); // Set validation message
            return false; // Return false for invalid
        }
        // Clear the validation message if all inputs are valid
        setValidationMessage("");
        return true; // Return true for valid
    };

    const handleNext = () => {
        if (validate()) {
            console.log({
                height: `${height} ${unit}`,
                weight: `${weight} ${weightUnit}`,
                goalWeight: `${goalWeight} ${goalWeightUnit}`,
            });
            onNext({ height, weight, goalWeight, unit, weightUnit, goalWeightUnit }); // Pass data back to parent
        }
    };

    return (
        <div className="container">
            <h1>User Details</h1>
            {validationMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{validationMessage}</div>} {/* Display validation message */}
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Height input */}
                <div className="form-group">
                    <label className="question-heading">How tall are you?</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        placeholder={`Enter your height in ${unit}`}
                        value={height}
                        onChange={handleHeightChange}
                        required
                    />
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="height-unit"
                                value="cm"
                                checked={unit === "cm"}
                                onChange={handleUnitChange}
                            />
                            cm
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="height-unit"
                                value="ft"
                                checked={unit === "ft"}
                                onChange={handleUnitChange}
                            />
                            ft
                        </label>
                    </div>
                </div>

                {/* Weight input */}
                <div className="form-group">
                    <label className="question-heading">How much do you weigh?</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        placeholder="Enter your weight"
                        value={weight}
                        onChange={handleWeightChange}
                        required
                    />
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="weight-unit"
                                value="kg"
                                checked={weightUnit === "kg"}
                                onChange={() => setWeightUnit("kg")}
                            />
                            kg
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weight-unit"
                                value="lb"
                                checked={weightUnit === "lb"}
                                onChange={() => setWeightUnit("lb")}
                            />
                            lb
                        </label>
                    </div>
                </div>

                {/* Goal weight input */}
                <div className="form-group">
                    <label className="question-heading">What’s your goal weight?</label>
                    <input
                        type="number"
                        id="goal-weight"
                        name="goal-weight"
                        placeholder="Goal weight to lose"
                        value={goalWeight}
                        onChange={handleGoalWeightChange}
                        required
                    />
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="goal-weight-unit"
                                value="kg"
                                checked={goalWeightUnit === "kg"}
                                onChange={() => setGoalWeightUnit("kg")}
                            />
                            kg
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="goal-weight-unit"
                                value="lb"
                                checked={goalWeightUnit === "lb"}
                                onChange={() => setGoalWeightUnit("lb")}
                            />
                            lb
                        </label>
                    </div>
                </div>

                <p className="info">
                    We take this data to calculate your calorie needs accurately.
                </p>
                
                {/* Navigation buttons */}
                <div className="navigation-buttons">
                    <button type="button" onClick={onBack}>Back</button>
                    <button type="button" onClick={handleNext}>Next</button>
                </div>
            </form>
        </div>
    );
};

export default TargetWeight;
