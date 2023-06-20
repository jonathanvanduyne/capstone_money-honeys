import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBeneficiaryTypes, getCurrentCustomerInfo, getBeneficiaryBridgesByCustomerId } from "../../../APIManager.js";
import "./CustomerProfile.css";

export const AddNewBeneficiary = () => {
    const [beneficiary, updateBeneficiary] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        dateOfBirth: "",
        relationship: "",
        typeId: 0
    });

    const [beneficiaryTypes, setBeneficiaryTypes] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [primaryBeneficiary, setPrimaryBeneficiary] = useState(null);
    const [secondaryBeneficiary, setSecondaryBeneficiary] = useState(null);
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    useEffect(() => {
        const fetchData = async () => {
            const types = await getAllBeneficiaryTypes();
            setBeneficiaryTypes(types);

            const customer = await getCurrentCustomerInfo();
            setCurrentCustomer(customer);

            if (customer) {
                const bridges = await getBeneficiaryBridgesByCustomerId(customer.id);
                if (bridges.typeId === 1) {
                    setPrimaryBeneficiary(bridges);
                }
                if (bridges.typeId === 2) {
                    setSecondaryBeneficiary(bridges);
                }
            }
        };

        fetchData();
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const handleInitialSaveButtonClick = (event) => {
        event.preventDefault();

        const productToSendToAPI = {
            name: beneficiary.name,
            address: beneficiary.address,
            phoneNumber: beneficiary.phoneNumber,
            dateOfBirth: beneficiary.dateOfBirth,
            relationship: beneficiary.relationship,
            typeId: beneficiary.typeId
        };

        return fetch("http://localhost:8088/beneficiaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bridgeTablePostOperation)
                });
            })
            .then(() => navigate("/profile"));
    };

    //

    const handleSecondarySaveButtonClick = (event) => {
        event.preventDefault();

        const productToSendToAPI = {
            name: beneficiary.name,
            address: beneficiary.address,
            phoneNumber: beneficiary.phoneNumber,
            dateOfBirth: beneficiary.dateOfBirth,
            relationship: beneficiary.relationship,
            typeId: beneficiary.typeId
        };

        return fetch("http://localhost:8088/beneficiaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bridgeTablePostOperation)
                });
            })
            .then(() => navigate("/profile"));
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, name: evt.target.value })}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-group"
                        placeholder="Beneficiary Address"
                        value={beneficiary.address}
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, address: evt.target.value })}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        required
                        autoFocus
                        type="tel"
                        className="form-group"
                        placeholder="Beneficiary Phone #"
                        value={beneficiary.phoneNumber}
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, phoneNumber: evt.target.value })}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        required
                        autoFocus
                        type="date"
                        className="form-group"
                        placeholder="Beneficiary Date of Birth"
                        value={beneficiary.dateOfBirth}
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, dateOfBirth: evt.target.value })}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="relationship">Relationship:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-group"
                        placeholder="Beneficiary Relationship to You"
                        value={beneficiary.relationship}
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, relationship: evt.target.value })}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Beneficiary Type:</label>
                    <select
                        required
                        className="form-group"
                        value={beneficiary.typeId}
                        onChange={(evt) => updateBeneficiary({ ...beneficiary, typeId: parseFloat(evt.target.value) })}
                    >
                        <option value="">Select a Beneficiary Type</option>
                        {!primaryBeneficiary && (
                            <option value="1">Primary</option>
                        )}
                        {!secondaryBeneficiary && (
                            <option value="2">Secondary</option>
                        )}
                    </select>
                </div>
            </fieldset>

            {!primaryBeneficiary && (
                <button onClick={handleInitialSaveButtonClick} className="btn btn-primary">
                    Submit Primary Beneficiary Info
                </button>
            )}

            {!secondaryBeneficiary && (
                <button onClick={handleSecondarySaveButtonClick} className="btn btn-primary">
                    Submit Secondary Beneficiary Info
                </button>
            )}

            {primaryBeneficiary && <p>You already have a primary beneficiary.</p>}
            {secondaryBeneficiary && <p>You already have a secondary beneficiary.</p>}
        </form>
    );
};
