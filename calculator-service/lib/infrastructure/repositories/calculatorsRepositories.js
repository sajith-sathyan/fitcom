"use strict";
import ICalculatorRepository from "../../domain/repositories/ICalculatorRepository.js";
import CalculatorEntity from '../../domain/entities/CalculatorEntity.js';
import MongooseCalculator from "../database/models/Calculator.Model.js";

export default class extends ICalculatorRepository {
  async persist(calculatorEntity) {
    const {
      userId,
      calculationType,
      inputData,
      result,
      notes = ''
    } = calculatorEntity;

    const mongooseCalculator = new MongooseCalculator({
      userId,
      calculationType,
      inputData,
      result,
      notes
    });

    await mongooseCalculator.save();

    return new CalculatorEntity({
      id: mongooseCalculator._id,
      userId: mongooseCalculator.userId,
      calculationType: mongooseCalculator.calculationType,
      inputData: mongooseCalculator.inputData,
      result: mongooseCalculator.result,
      notes: mongooseCalculator.notes,
      createdAt: mongooseCalculator.createdAt,
      updatedAt: mongooseCalculator.updatedAt,
    });
  }

  async findByUserId(userId) {
    throw new Error('findByUserId method not implemented');
  }
}
