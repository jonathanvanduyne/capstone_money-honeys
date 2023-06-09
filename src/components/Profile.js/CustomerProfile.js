import { useEffect, useState } from "react";
import { getCurrentCustomerInfo } from "../../APIManager.js";

export const CustomerProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentCustomerInfo()
            .then((data) => {
                setCurrentUser(data);
            });
    }, []);

    return (
        <>
            <div>
                <p>Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}</p>
                <p>Email: {currentUser?.user?.email}</p>
                <p>Address: {currentUser?.address}</p>
                <p>Phone Number: {currentUser?.phoneNumber}</p>
                <p>Date of Birth: {currentUser?.dateOfBirth}</p>
                <p>Beneficiary: {currentUser?.beneficiary}</p>
                <button>Update Profile</button>
            </div>
        </>
    )
}