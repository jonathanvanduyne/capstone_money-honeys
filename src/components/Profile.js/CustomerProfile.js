import { useEffect, useState } from "react";
import { getCurrentCustomerInfo } from "../../APIManager.js";
import { useNavigate } from "react-router-dom";

export const CustomerProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate()

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        getCurrentCustomerInfo()
            .then((data) => {
                setCurrentUser(data);
            });
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <>
            <div>
                <p>Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}</p>
                <p>Email: {currentUser?.user?.email}</p>
                <p>Address: {currentUser?.address}</p>
                <p>Phone Number: {currentUser?.phoneNumber}</p>
                <p>Date of Birth: {currentUser?.dateOfBirth}</p>
                <p>Beneficiary: {currentUser?.beneficiary}</p>
                <button onClick={() => navigate("UpdateCustomerProfile")}>Update Profile</button>
            </div>
        </>
    )
}