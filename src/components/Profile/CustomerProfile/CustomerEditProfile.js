import { useEffect, useState } from "react";
import { getCurrentCustomerInfo } from "../../../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./EditProfile&Beneficiary.css";

export const UpdateCustomerProfile = () => {
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    });

    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate()

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback]);

    useEffect(() => {
        const fetchData = async () => {
            const customer = await getCurrentCustomerInfo();
            updateProfile(customer);
        };

        fetchData();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        await fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then((response) => response.json())
            .then(() => {
                setFeedback("Employee profile successfully saved - Rerouting to Profile");
            })
            .then(() => {
                setTimeout(() => {
                    setFeedback(""); // Clear the feedback message after 3 seconds
                    navigate("/profile"); // Navigate to "/profile" after 3 seconds
                }, 3000);
            });
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className={`edit-profile-feedback ${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="edit-profile-form">
                <h2 className="edit-profile-title">Update Profile</h2>
                <fieldset>
                    <div className="edit-profile-form-group">
                        <label htmlFor="Address">Address:</label>
                        <input
                            type="text"
                            className="edit-profile-form-control"
                            value={profile?.address}
                            onChange={(evt) => {
                                const copy = { ...profile };
                                copy.address = evt.target.value;
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="edit-profile-form-group">
                        <label htmlFor="Phone">Phone Number:</label>
                        <input
                            type="tel"
                            className="edit-profile-form-control"
                            value={profile?.phoneNumber}
                            onChange={(evt) => {
                                const copy = { ...profile };
                                copy.phoneNumber = evt.target.value;
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <button onClick={handleSaveButtonClick} className="edit-profile-button">
                    Save Profile
                </button>
            </form>
        </>
    );
}
