import { useEffect, useState } from "react";
import { getCurrentAdvisorInfo } from "../../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export const AdvisorProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentAdvisorInfo()
            .then((data) => {
                setCurrentUser(data);
            });
    }, []);

    return (
        <>
            <div className="customer-profile">
                <p>Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}</p>
                <p>Email: {currentUser?.user?.email}</p>
                <p>Office Address: {currentUser?.officeAddress}</p>
                <p>Office Phone Number: {currentUser?.officePhone}</p>
                <button onClick={() => navigate("UpdateAdvisorProfile")}>Update Profile</button>
            </div>
        </>
    );
};
