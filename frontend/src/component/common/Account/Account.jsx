import React, { useState, useEffect } from 'react';
import { api, userService } from '../../../api/authApi'; // your axios instance
import './Style.css';

function Account() {
    const [user, setUser] = useState(); // User is initially null
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        const email = localStorage.getItem('email');

        console.log(email);
        if (email) {
            api.get(`${userService}/users/${email}`)
                .then(res => {
                    const { username, email, emailVerified, bio, phone } = res.data;

                    const nameParts = username.trim().split(' ');
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(' ');

                    setUser({
                        firstName,
                        lastName,
                        email,
                        emailVerified,
                        phone: phone || '',
                        bio: bio || ''
                    });
                })
                .catch(err => console.error('Failed to fetch user:', err));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        const updatedUser = {
            username: `${user.firstName} ${user.lastName}`.trim(),
            email: user.email,
            phone: user.phone,
            bio: user.bio
        };

        api.put(`${userService}/users/${user.email}`, updatedUser)
            .then(() => {getUserData();
                setSuccessMessage("Profile updated successfully!");
    
                // Auto hide after 3 seconds
                setTimeout(() => setSuccessMessage(''), 3000);
            }).catch(err => console.error("Failed to update user:", err));
    };


    const handleCancel = () => {
        window.location.reload(); // Just reload to reset
    };

    const handleResendVerification = () => {
        api.post(`${userService}/auth/resend-verification`, { email: user.email })
            .then(() => alert("Verification email sent"))
            .catch(err => console.error("Failed to resend email:", err));
    };

    if (!user) {
        return <div className="loading">Loading account details...</div>;
    }

    return (
        <div className="account-container">
            <h2 className="account-heading">Account Settings</h2>
            <div className="account-info">
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                <div className="row">
                    <div className="info-item half">
                        <label>First Name:</label>
                        <input
                            className="account-input"
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="info-item half">
                        <label>Last Name:</label>
                        <input
                            className="account-input"
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="info-item half">
                        <label>Email:</label>
                        <div className="email-field">
                            <input
                                className="account-input"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                disabled
                            />

                            <div className="email-verification-wrapper">
                                <span className={`email-status ${user.emailVerified ? 'verified' : 'unverified'}`}>
                                    {user.emailVerified ? '✔ Verified' : '❌ Not Verified'}
                                </span>
                                {!user.emailVerified && (
                                    <button className="resend-btn" onClick={handleResendVerification}>
                                        Resend
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="info-item half">
                        <label>Phone:</label>
                        <input
                            className="account-input"
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="info-item full">
                        <label>Bio:</label>
                        <textarea
                            className="account-textarea"
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="button-row">
                    <button className="update-btn" onClick={handleUpdate}>Update</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Account;
