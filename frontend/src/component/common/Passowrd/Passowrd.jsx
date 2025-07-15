import React, { useState } from 'react';
import './Style.css';

function Password() {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="password-container">
      <h2 className="password-heading">🔐 Change Password</h2>
      <div className="password-form">

        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            className="password-input"
            value={form.oldPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            className="password-input"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            className="password-input"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="button-row">
          <button className="update-btn">Update</button>
          <button className="cancel-btn">Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default Password;
