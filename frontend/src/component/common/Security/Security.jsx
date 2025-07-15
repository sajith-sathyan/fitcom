// src/pages/Security.js
import React, { useState } from 'react';
import './Style.css';
import { useNavigate } from 'react-router-dom';

function Security() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const navigate = useNavigate()
    const toggle2FA = () => {
        setIs2FAEnabled(prev => !prev);
        // You can add backend API integration here
    };

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem('userId')
        localStorage.removeItem('user-info')
        navigate('/login')
    }

    return (
        <div className="security-container">
            <h2 className="section-heading">🔐 Security Settings</h2>

            <div className="security-section">
                <h4>Two-Factor Authentication (2FA)</h4>
                <p>Enhance your account security by enabling two-factor authentication.</p>
                <button className={is2FAEnabled ? "disable-btn" : "enable-btn"} onClick={toggle2FA}>
                    {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
            </div>
            <div className="security-section">
                <h4>Payment Details Security</h4>
                <p>Manage your saved payment methods securely.</p>

                <div className="card-info">
                    <span>💳 **** **** **** 1234</span>
                    <span className="last-used">Last used: Mar 25, 2025</span>
                </div>

                <div className="payment-buttons">
                    <button className="update-btn">Update Payment Method</button>
                    <button className="remove-btn">Remove</button>
                </div>
            </div>



            <div className="security-section">
                <h4>Trusted Devices</h4>
                <p>Manage which devices you’ve logged in from.</p>
                <button className="clear-btn">Remove All Trusted Devices</button>
            </div>

            <div className="security-section">
                <h4>Security Tips</h4>
                <ul>
                    <li>Use strong passwords 🔑</li>
                    <li>Don't reuse passwords across sites 🔁</li>
                    <li>Enable 2FA for sensitive accounts 💪</li>
                </ul>
            </div>


            <div className="security-section">
                <h4>Recent Login Activity</h4>
                <ul className="login-activity">
                    <li>📍 Kochi - Chrome - Mar 30, 2025</li>
                    <li>📱 Mobile - Safari - Mar 28, 2025</li>
                    <div className="payment-buttons">

                        <button onClick={handleLogOut} className="LogOut-btn">Log Out</button>
                    </div>
                </ul>

            </div>
        </div>
    );
}

export default Security;
