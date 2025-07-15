import mongoose from 'mongoose';

const CalculatorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    calculationType: {
      type: String,
      required: true,
      enum: [
        'BMI',
        'BMR',
        'TDEE',
        'OneRepMax',
        'BodyFat',
        'LeanBodyMass',
        'CalorieNeeds',
        'MacroSplit',
        'Hydration',
        'IdealBodyWeight',
        'WaistToHeightRatio',
        'VO2Max',
        'HeartRateZones',
        'PregnancyCalorie',
        'CalorieBurn',
        'StepToCalorie',
        'ProteinRequirement',
        'GlycemicLoad'
      ],
    },
    inputData: {
      type: Object,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default mongoose.model('Calculator', CalculatorSchema);
