import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentAdvisorInfo } from '../../../APIManager.js';
import './AdvisorProfile.css';

export const AdvisorProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentAdvisorInfo().then((data) => {
            setCurrentUser(data);
        });
    }, []);

    const isLastNameEndsWithS = () => {
        const advisorFirstName = currentUser?.user?.firstName || "";
        return advisorFirstName.charAt(advisorFirstName.length - 1) === "s";
    };

    return (
        <div className="primary-page-container">
            <div className="primary-advisor-profile-container">
                <section className="primary-advisor-profile__header">
                    {currentUser?.user?.firstName}
                    {isLastNameEndsWithS() ? "'" : "'s"} Profile
                </section>
                <section className="primary-advisor-profile__info">
                    <p className="primary-advisor-profile__label">
                        Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}
                    </p>
                    <p className="primary-advisor-profile__label">
                        Email: {currentUser?.user?.email}
                    </p>
                    <p className="primary-advisor-profile__label">
                        Office Address: {currentUser?.officeAddress}
                    </p>
                    <p className="primary-advisor-profile__label">
                        Office Phone Number: {currentUser?.officePhone}
                    </p>
                </section>
                <button
                    className="primary-button is-primary primary-advisor-profile__update-button"
                    onClick={() => navigate("UpdateAdvisorProfile")}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}

