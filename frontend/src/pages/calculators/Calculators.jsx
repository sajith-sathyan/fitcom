import React, { useState } from 'react';
import './Style.css';
import Navbar from '../../component/navBar/Navbar';
import SubNavBar from '../../component/button/SubNavBar/SubNavBar';
import AllNutrition from '../../component/common/AllNutrition/AllNutrition';
import BodyMassIndex from '../../component/common/AllCalculators/BodyMassIndex/BodyMassIndex';
import BasalMetabolicRate from '../../component/common/AllCalculators/BasalMetabolicRate/BasalMetabolicRate';
import TDEECalculator from '../../component/common/AllCalculators/TDEECalculator/TDEECalculator';
import OneRepMaxCalculator from '../../component/common/AllCalculators/OneRepMaxCalculator/OneRepMaxCalculator';
import BodyFatPercentageCalculator from '../../component/common/AllCalculators/BodyFatPercentage/BodyFatPercentage';
import LeanBodyMassCalculator from '../../component/common/AllCalculators/LeanBodyMassCalculator/LeanBodyMassCalculator';
import CalorieNeedsCalculator from '../../component/common/AllCalculators/CalorieNeedsCalculator/CalorieNeedsCalculator';
import MacroSplitCalculator from '../../component/common/AllCalculators/MacroSplitCalculator/MacroSplitCalculator';
import HydrationNeedsCalculator from '../../component/common/AllCalculators/HydrationNeeds/HydrationNeedsCalculator';
import IdealBodyWeightCalculator from '../../component/common/AllCalculators/IdealBodyWeightCalculator/IdealBodyWeightCalculator';
import WaistToHeightRatioCalculator from '../../component/common/AllCalculators/WaistToHeightRatioCalculator/WaistToHeightRatioCalculator';
import VO2MaxCalculator from '../../component/common/AllCalculators/VO2MaxCalculator/VO2MaxCalculator';
import HeartRateZones from '../../component/common/AllCalculators/HeartRateZones/HeartRateZones';
import PregnancyCalorieCalculator from '../../component/common/AllCalculators/PregnancyCalorieCalculator/PregnancyCalorieCalculator';
import FertilityWindowCalculator from '../../component/common/AllCalculators/FertilityWindowCalculator/FertilityWindowCalculator';
import CalorieBurnCalculator from '../../component/common/AllCalculators/CalorieBurnCalculator/CalorieBurnCalculator';
import StepToCalorieConverter from '../../component/common/AllCalculators/StepToCalorieConverter/StepToCalorieConverter';
import ProteinRequirementCalculator from '../../component/common/AllCalculators/ProteinRequirementCalculator/ProteinRequirementCalculator';
import GlycemicLoadCalculator from '../../component/common/AllCalculators/GlycemicLoadCalculator/GlycemicLoadCalculator';

const Calculators = () => {
  // const [bmi, setBmi] = useState('');
  const [bmr, setBmr] = useState('');
  const [tdee, setTdee] = useState('');
  const [rm, setRm] = useState('');
  const [navbarStatus, setNavbarStatus] = useState(1);
  
  const navOptions = [
    { label: "BMI (Body Mass Index)", value: 1 },
    { label: "BMR (Basal Metabolic Rate)", value: 2 },
    { label: "TDEE (Total Daily Energy Expenditure)", value: 3 },
    { label: "1RM (One-Rep Max)", value: 4 },
    { label: "Body Fat Percentage", value: 5 },
    { label: "Lean Body Mass", value: 6 },
    { label: "Calorie Needs", value: 7 },
    { label: "Macro Split (Protein/Carbs/Fats)", value: 8 },
    { label: "Hydration Needs", value: 9 },
    { label: "Ideal Body Weight", value: 10 },
    { label: "Waist-to-Height Ratio", value: 11 },
    { label: "VO2 Max (Cardio Fitness)", value: 12 },
    { label: "Heart Rate Zones", value: 13 },
    { label: "Pregnancy Calorie Calculator", value: 14 },
    { label: "Best Time to Get Pregnant", value: 15 },
    { label: "Calorie Burn per Activity", value: 16 },
    { label: "Step-to-Calorie Converter", value: 17 },
    { label: "Protein Requirement", value: 18 },
    { label: "Glycemic Load Calculator", value: 19 }
  ];
  

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const bmiValue = weight / (height * height);
      setBmi(bmiValue.toFixed(2));
    }
  };

  
  return (
    <>
      <Navbar />

      <main className="main-content">
        <SubNavBar options={navOptions} onSelect={setNavbarStatus} />
      </main>
      {navbarStatus === 1 && (<BodyMassIndex/>)}
      {navbarStatus === 2 && (<BasalMetabolicRate/>)}
      {navbarStatus === 3 && (<TDEECalculator/>)}
      {navbarStatus === 4 && (<OneRepMaxCalculator/>)}
      {navbarStatus === 5 && (<BodyFatPercentageCalculator/>)}
      {navbarStatus === 6 && (<LeanBodyMassCalculator/>)}
      {navbarStatus === 7 && (<CalorieNeedsCalculator/>)}
      {navbarStatus === 8 && (<MacroSplitCalculator/>)}
      {navbarStatus === 9 && (<HydrationNeedsCalculator/>)}
      {navbarStatus === 10 && (<IdealBodyWeightCalculator/>)}
      {navbarStatus === 11 && (<WaistToHeightRatioCalculator/>)}
      {navbarStatus === 12 && (<VO2MaxCalculator/>)}
      {navbarStatus === 13 && (<HeartRateZones/>)}
      {navbarStatus === 14 && (<PregnancyCalorieCalculator/>)}
      {navbarStatus === 15 && (<FertilityWindowCalculator/>)}
      {navbarStatus === 16 && (<CalorieBurnCalculator/>)}
      {navbarStatus === 17 && (<StepToCalorieConverter/>)}
      {navbarStatus === 18 && (<ProteinRequirementCalculator/>)}
      {navbarStatus === 19 && (<GlycemicLoadCalculator/>)}

     
    </>
  );
};

export default Calculators;
