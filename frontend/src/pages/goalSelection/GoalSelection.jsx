import React, { useState } from "react";
import "./Style.css";
import GoalSelectionButton from "../../component/Button/GoalSelectionButton/GoalSelectionButton";
import usePagination from "../../Hooks/usePagination";
import AlertSection from "../../component/error/Error/AlertSection";
import Register from "../../Pages/Register/Register";
import { WorkoutRecommendationOptions } from "../../utils/constants";
import { OhSnap } from "../../utils/alertData";
import { handleSelectOption, handleNextPage } from "./helper.js";
import axios from "axios";
import forge from "node-forge";

function GoalSelection() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const totalPages = WorkoutRecommendationOptions.length + 1;
  const { currentPage, handleNext, handlePrevious } = usePagination(totalPages, 0);

  const handleRegisterChange = (data) => {
    setFormData(data);
    console.log("Register Data in GoalSelection:", data);
  };

  const encryptData = (data, publicKey) => {
    try {
      const rsa = forge.pki.publicKeyFromPem(publicKey);
      const encrypted = rsa.encrypt(
        forge.util.encodeUtf8(JSON.stringify(data)),
        "RSA-OAEP"
      );
      return forge.util.encode64(encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
      return null;
    }
  };

  const handleNextWithSubmission = async () => {
    console.log("Final submission process started");
    setLoading(true);
    setAlertMessage(null);

    try {
      const response = await axios.get("http://localhost:3000/rsa/public-key");
      const fetchedPublicKey = response.data.publicKey;

      if (!fetchedPublicKey) {
        throw new Error("Public key is missing");
      }

      const dataForEncryption = { formData, selectedOptions };
      const encryptedData = encryptData(dataForEncryption, fetchedPublicKey);
      
      if (!encryptedData) {
        throw new Error("Encryption failed");
      }

      const submissionResponse = await axios.post(
        "http://localhost:3000/rsa/register",
        { encryptedData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (submissionResponse.data.success) {
        setResponseMessage("Submission successful! 🎉");
      } else {
        throw new Error(submissionResponse.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage({ ...OhSnap, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="goal-container">
      {alertMessage && (
        <AlertSection message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}

      {currentPage === WorkoutRecommendationOptions.length ? (
        <Register onFormChange={handleRegisterChange} />
      ) : (
        <>
          <h4>{WorkoutRecommendationOptions[currentPage].question}</h4>
          {WorkoutRecommendationOptions[currentPage].options.map((option, index) => (
            <GoalSelectionButton
              key={index}
              title={option}
              onClick={() => handleSelectOption(option, currentPage, setSelectedOptions, setAlertMessage)}
              className={selectedOptions[currentPage] === option ? "selected-option" : ""}
            />
          ))}
        </>
      )}

      <div className="pagination-buttons">
        <button className="nav-button" onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>

        {currentPage === WorkoutRecommendationOptions.length ? (
          <button className="nav-button" onClick={handleNextWithSubmission} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            className="nav-button"
            onClick={() => handleNextPage(currentPage, selectedOptions, setAlertMessage, handleNext, OhSnap)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default GoalSelection;