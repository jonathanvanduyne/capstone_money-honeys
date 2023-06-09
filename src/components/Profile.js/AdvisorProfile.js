import { useEffect, useState } from "react";
import { getCurrentAdvisorInfo } from "../../APIManager.js";

export const AdvisorProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentAdvisorInfo()
            .then((data) => {
                setCurrentUser(data);
            });
    }, []);

    return (
        <>
            <div>
                <p>Name: {currentUser.user.firstName} {currentUser.user.lastName}</p>
                <p>Email: {currentUser.user.email}</p>
                <p>Office Address: {currentUser.officeAddress}</p>
                <p>Office Phone Number: {currentUser.officePhone}</p>
                <button>Update Profile</button>
            </div>
        </>
    );
};
