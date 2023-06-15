import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBeneficiaryTypes, getCurrentCustomerInfo } from "../../APIManager.js";

export const AddNewBeneficiary = () => {
    const [beneficiary, updateBeneficiary] = useState(
        {
            name: "",
            address: "",
            phoneNumber: "",
            dateOfBirth: "",
            relationship: "",
            typeId: 0
        }
    );

    const [beneficiariesTypes, setBeneficiaryTypes] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState([])

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const types = await getAllBeneficiaryTypes();
            setBeneficiaryTypes(types);

            const currentUser = await getCurrentCustomerInfo()
            setCurrentCustomer(currentUser)
        };

        fetchData();
    }, []);

    const handleInitialSaveButtonClick = (event) => {
        event.preventDefault();

        const productToSendToAPI = {
            name: beneficiary.name,
            address: beneficiary.address,
            phoneNumber: beneficiary.phoneNumber,
            dateOfBirth: beneficiary.dateOfBirth,
            relationship: beneficiary.relationship,
            typeId: beneficiary.typeId,
        };

        return fetch("http://localhost:8088/beneficiaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productToSendToAPI),
        })
            .then((response) => response.json())
            .then((newBeneficiary) => {
                const bridgeTablePostOperation = {
                    customerId: currentCustomer.id,
                    beneficiaryId: newBeneficiary.id,
                };

                return fetch("http://localhost:8088/beneficiaryBridges", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bridgeTablePostOperation),
                });
            })
            .then(() => navigate("/profile"));
    };

    return (
        <form className="beneficiary_Form">
            <h2 className="beneficiary_Form__title">Add New Beneficiary</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-group"
                        placeholder="Beneficiary Name"
                        value={beneficiary.name}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.name = evt.target.value;
                            updateBeneficiary(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Address">Address:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-group"
                        placeholder="Beneficiary Address"
                        value={beneficiary.address}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.address = evt.target.value;
                            updateBeneficiary(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Phone Number">Phone Number:</label>
                    <input
                        required
                        autoFocus
                        type="tel"
                        className="form-group"
                        placeholder="Beneficiary Phone #"
                        value={beneficiary.phoneNumber}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.phoneNumber = evt.target.value;
                            updateBeneficiary(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="DateOfBirth">Date of Birth:</label>
                    <input
                        required
                        autoFocus
                        type="date"
                        className="form-group"
                        placeholder="Beneficiary Date of Birth"
                        value={beneficiary.dateOfBirth}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.dateOfBirth = evt.target.value;
                            updateBeneficiary(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Relationship">Relationship:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-group"
                        placeholder="Beneficiary Relationship to You"
                        value={beneficiary.relationship}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.relationship = evt.target.value;
                            updateBeneficiary(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Type">Beneficiary Type:</label>
                    <select
                        required
                        className="form-group"
                        value={beneficiary.typeId}
                        onChange={(evt) => {
                            const copy = { ...beneficiary };
                            copy.typeId = parseFloat(evt.target.value);
                            updateBeneficiary(copy);
                        }}
                    >
                        <option value="">Select a Benificiary Type</option>
                        {beneficiariesTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.category}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleInitialSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Submit Beneficiary Info
            </button>
        </form>
    );
};
