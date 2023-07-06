import { useEffect, useState } from "react";
import { getAllBeneficiaryTypes, getBeneficiaryForEdit } from "../../../APIManager.js";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProfile&Beneficiary.css";

export const CustomerEditBeneficiary = () => {
    const [beneficiaryProfile, updateBeneficiaryProfile] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        dateOfBirth: "",
        relationship: "",
        typeId: "",
    });

    const [beneficiariesTypes, setBeneficiaryTypes] = useState([]);
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const { beneficiaryId } = useParams();

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback]);

    useEffect(() => {
        const fetchData = async () => {
            const beneficiaryfetch = await getBeneficiaryForEdit({ beneficiaryId });
            updateBeneficiaryProfile(beneficiaryfetch);

            const types = await getAllBeneficiaryTypes();
            setBeneficiaryTypes(types);
        };

        fetchData();
    }, [beneficiaryId]);

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        await fetch(`http://localhost:8088/beneficiaries/${beneficiaryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(beneficiaryProfile),
        })
            .then((response) => response.json())
            .then(() => {
                setFeedback("Beneficiary successfully saved - Rerouting to Profile");
            })
            .then(() => {
                setTimeout(() => {
                    setFeedback("");
                    navigate("/profile");
                }, 3000);
            });
    };

    return (
        <>
            <div className={`${feedback.includes("Error") ? "edit-beneficiary-error" : "edit-beneficiary-feedback"} ${feedback === "" ? "edit-beneficiary-invisible" : "edit-beneficiary-visible"}`}>
                {feedback}
            </div>
            <form className="edit-beneficiary-form">
                <h2 className="edit-beneficiary-title">Edit Beneficiary</h2>

                <fieldset>
                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="edit-beneficiary-input"
                            placeholder="Beneficiary Name"
                            value={beneficiaryProfile.name}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.name = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required
                            type="text"
                            className="edit-beneficiary-input"
                            placeholder="Beneficiary Address"
                            value={beneficiaryProfile.address}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.address = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            required
                            type="tel"
                            className="edit-beneficiary-input"
                            placeholder="Beneficiary Phone Number"
                            value={beneficiaryProfile.phoneNumber}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.phoneNumber = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            required
                            type="date"
                            className="edit-beneficiary-input"
                            value={beneficiaryProfile.dateOfBirth}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.dateOfBirth = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="relationship">Relationship:</label>
                        <input
                            required
                            type="text"
                            className="edit-beneficiary-input"
                            placeholder="Beneficiary Relationship"
                            value={beneficiaryProfile.relationship}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.relationship = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="edit-beneficiary-form-group">
                        <label htmlFor="type">Type:</label>
                        <select
                            required
                            className="edit-beneficiary-input"
                            value={beneficiaryProfile.typeId}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.typeId = parseInt(evt.target.value);
                                updateBeneficiaryProfile(copy);
                            }}
                        >
                            <option value="">Select Type</option>
                            {beneficiariesTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.category}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <button onClick={handleSaveButtonClick} className="save-edit-beneficiary-button">
                    Save Beneficiary
                </button>
            </form>
        </>
    );
}