import { useEffect, useState } from "react";
import { getAllBeneficiaryTypes, getBeneficiaryForEdit } from "../../APIManager.js";
import { useNavigate, useParams } from "react-router-dom";

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
            <div
                className={`${feedback.includes("Error") ? "error" : "feedback"
                    } ${feedback === "" ? "invisible" : "visible"}`}
            >
                {feedback}
            </div>
            <form className="beneficiary_Form">
                <h2 className="beneficiary_Form__title">Edit Beneficiary</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="form-group"
                            placeholder="Beneficiary Name"
                            value={beneficiaryProfile.name}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.name = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required
                            type="text"
                            className="form-group"
                            placeholder="Beneficiary Address"
                            value={beneficiaryProfile.address}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.address = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            required
                            type="tel"
                            className="form-group"
                            placeholder="Beneficiary Phone Number"
                            value={beneficiaryProfile.phoneNumber}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.phoneNumber = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            required
                            type="date"
                            className="form-group"
                            value={beneficiaryProfile.dateOfBirth}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.dateOfBirth = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="relationship">Relationship:</label>
                        <input
                            required
                            type="text"
                            className="form-group"
                            placeholder="Beneficiary Relationship"
                            value={beneficiaryProfile.relationship}
                            onChange={(evt) => {
                                const copy = { ...beneficiaryProfile };
                                copy.relationship = evt.target.value;
                                updateBeneficiaryProfile(copy);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select
                            required
                            className="form-group"
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

                <button onClick={handleSaveButtonClick} className="btn btn-primary">
                    Save Beneficiary
                </button>
            </form>
        </>
    );
}