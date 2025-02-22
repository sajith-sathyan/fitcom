import React, { useState, useEffect } from "react";
import './UserDetailsForm.css';  

function UserDetailsForm({ onNext, onBack, userDetails }) {
  const [formData, setFormData] = useState({
    gender: userDetails.gender || "",
    dob: userDetails.dob || "",
    location: userDetails.location || "",
  });

  useEffect(() => {
    // When userDetails prop changes, update formData
    setFormData({
      gender: userDetails.gender || "",
      dob: userDetails.dob || "",
      location: userDetails.location || "",
    });
  }, [userDetails]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData); // You can also process the data here if needed
    onNext(formData); // Pass formData to the parent on next
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Please select which sex we should use to calculate your calorie needs:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <h3 htmlFor="dob">When were you born?</h3>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <h3 htmlFor="location">Where do you live?</h3>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Your location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <p className="info">We take this data to calculate your calorie needs accurately.</p>

        <div className="navigation-buttons">
          <button type="button" className="nav-btn" onClick={onBack}>Back</button>
          <button type="submit" className="nav-btn">Next</button>
        </div>
      </form>
    </div>
  );
}

export default UserDetailsForm;
