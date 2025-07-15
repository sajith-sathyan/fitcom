export default class {
    constructor(
        id,
        userId,
        calculationType,       // e.g., 'BMI', 'TDEE', 'ProteinRequirement'
        inputData = {},        // e.g., { weight: 70, height: 175 }
        result = {},           // e.g., { bmi: 22.9, status: 'Normal' }
        notes = '',
        createdAt,
        modifiedAt
    ) {
        this.id = id;
        this.userId = userId;
        this.calculationType = calculationType;
        this.inputData = inputData;
        this.result = result;
        this.notes = notes;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;

        this._modifiedFields = {};
    }

    updateInput(newInput) {
        if (JSON.stringify(newInput) !== JSON.stringify(this.inputData)) {
            this.inputData = newInput;
            this._modifiedFields.inputData = true;
        }
    }

    updateResult(newResult) {
        if (JSON.stringify(newResult) !== JSON.stringify(this.result)) {
            this.result = newResult;
            this._modifiedFields.result = true;
        }
    }

    updateNotes(newNotes) {
        if (newNotes && newNotes !== this.notes) {
            this.notes = newNotes;
            this._modifiedFields.notes = true;
        }
    }

    updateModifiedAt(timestamp) {
        if (timestamp && timestamp !== this.modifiedAt) {
            this.modifiedAt = timestamp;
            this._modifiedFields.modifiedAt = true;
        }
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        this._modifiedFields = {};
    }
}
