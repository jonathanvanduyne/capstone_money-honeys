import { useEffect, useState } from "react";
import { getCurrentAdvisorInfo } from "../../../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./AdvisorProfile.css"

export const UpdateAdvisorProfile = () => {
    const [profile, updateProfile] = useState({
        officeAddress: "",
        officePhone: "",
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
            const advisor = await getCurrentAdvisorInfo();
            updateProfile(advisor);
        };

        fetchData();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        await fetch(`http://localhost:8088/advisors/${profile.id}`, {
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
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Update Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="officeAddress">Office Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile?.officeAddress}
                            onChange={(evt) => {
                                const copy = { ...profile };
                                copy.officeAddress = evt.target.value;
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="officePhone">Office Phone:</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={profile?.officePhone}
                            onChange={(evt) => {
                                const copy = { ...profile };
                                copy.officePhone = evt.target.value;
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <button onClick={handleSaveButtonClick} className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    );
};
