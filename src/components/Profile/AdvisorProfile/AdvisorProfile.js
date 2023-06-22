import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentAdvisorInfo } from '../../../APIManager.js';

export const AdvisorProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentAdvisorInfo().then((data) => {
            setCurrentUser(data);
        });
    }, []);

    return (
        <div className="page-container">
            <div className="advisor-profile-container">
                <section className="advisor-profile__header">Advisor Profile</section>
                <section className="advisor-profile__info">
                    <p className="advisor-profile__label">
                        Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}
                    </p>
                    <p className="advisor-profile__label">Email: {currentUser?.user?.email}</p>
                    <p className="advisor-profile__label">Office Address: {currentUser?.officeAddress}</p>
                    <p className="advisor-profile__label">Office Phone Number: {currentUser?.officePhone}</p>
                </section>
                <button className="button is-primary advisor-profile__update-button" onClick={() => navigate("UpdateAdvisorProfile")}>
                    Update Profile
                </button>
            </div>
        </div>
    );
};
