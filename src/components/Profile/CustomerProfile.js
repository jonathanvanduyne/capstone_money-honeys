import React, { useEffect, useState } from "react";
import { getAllBeneficiaryTypes, getBeneficiaryBridges, getCurrentCustomerBeneficiaries, getCurrentCustomerInfo } from "../../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const CustomerProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [beneficiariesTypes, setBeneficiaryTypes] = useState([]);
    const [beneficiaryBridges, setBeneficiaryBridges] = useState([]);
    const [showAddBeneficiaryButton, setShowAddBeneficiaryButton] = useState(true);
    const [primaryBeneficiary, setPrimaryBeneficiary] = useState([]);
    const [secondaryBeneficiary, setSecondaryBeneficiary] = useState([]);
    const [isSecondaryBeneficiaryChanged, setIsSecondaryBeneficiaryChanged] = useState(false);
    const navigate = useNavigate();

    const fetchCustomer = async () => {
        const currentCustomer = await getCurrentCustomerInfo();
        setCurrentUser(currentCustomer);
    };

    const fetchBeneficiaryData = async () => {
        const customerBeneficiaries = await getCurrentCustomerBeneficiaries();
        setBeneficiaries(customerBeneficiaries);

        const beneficiaryTypes = await getAllBeneficiaryTypes();
        setBeneficiaryTypes(beneficiaryTypes);

        const beneficiaryBridges = await getBeneficiaryBridges();
        setBeneficiaryBridges(beneficiaryBridges);

        if (customerBeneficiaries.length >= 2) {
            setShowAddBeneficiaryButton(false);
        } else {
            setShowAddBeneficiaryButton(true);
        }
    };

    useEffect(() => {
        fetchCustomer();
        fetchBeneficiaryData();
    }, []);

    useEffect(() => {
        beneficiaries.map((currentBeneficiary) => {
            if (currentBeneficiary?.beneficiary?.typeId === 1) {
                setPrimaryBeneficiary(currentBeneficiary);
            }
            if (currentBeneficiary?.beneficiary?.typeId === 2) {
                setSecondaryBeneficiary(currentBeneficiary);
            }
        });
    }, [beneficiaries]);

    const getBeneficiaryTypeName = (parameter) => {
        const beneficiaryTypeId = parameter?.beneficiary?.typeId;
        const category = beneficiariesTypes.find((type) => type.id === beneficiaryTypeId);
        return category?.category;
    };

    const handleBeneficiaryDelete = async (beneficiary) => {
        await fetch(`http://localhost:8088/beneficiaries/${beneficiary.id}`, {
            method: "DELETE",
        });

        const bridgeTable = beneficiaryBridges.find((bridge) => beneficiary.id === bridge?.beneficiaryId);
        await fetch(`http://localhost:8088/beneficiaryBridges/${bridgeTable.id}`, {
            method: "DELETE",
        });

        handlePrimaryBeneficiaryDelete(beneficiary);
        fetchCustomer();
        fetchBeneficiaryData();
    };

    const handlePrimaryBeneficiaryDelete = async (beneficiary) => {
        if (beneficiary?.beneficiary?.typeId === 1) {
            const secondaryBeneficiaryToBeEdited = secondaryBeneficiary.beneficiary;

            const newPrimaryBeneficiary = {
                name: secondaryBeneficiaryToBeEdited.name,
                address: secondaryBeneficiaryToBeEdited.address,
                phoneNumber: secondaryBeneficiaryToBeEdited.phoneNumber,
                dateOfBirth: secondaryBeneficiaryToBeEdited.dateOfBirth,
                relationship: secondaryBeneficiaryToBeEdited.relationship,
                typeId: 1,
            };

            await fetch(`http://localhost:8088/beneficiaries/${secondaryBeneficiaryToBeEdited.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPrimaryBeneficiary),
            });

            setPrimaryBeneficiary(secondaryBeneficiaryToBeEdited);
            setSecondaryBeneficiary([]);
            setIsSecondaryBeneficiaryChanged(true);
        }
    };

    const handleBeneficiaryEdit = (beneficiaryId) => {
        navigate(`/profile/editBeneficiary/${beneficiaryId}`);
    };

    const AddNewBeneficiaryButtonClick = () => {
        navigate("/addNewBeneficiary");
    };

    return (
        <>
            <div className="customer-profile">
                <h3>Profile</h3>
                <section className="profile">
                    <p>Name: {currentUser?.user?.firstName} {currentUser?.user?.lastName}</p>
                    <p>Email: {currentUser?.user?.email}</p>
                    <p>Address: {currentUser?.address}</p>
                    <p>Phone Number: {currentUser?.phoneNumber}</p>
                    <p>Date of Birth: {currentUser?.dateOfBirth}</p>
                    <button onClick={() => navigate("UpdateCustomerProfile")}>Update Profile</button>
                </section>
            </div>
            <div className="customer-profile">
                <h3>Beneficiaries</h3>
                {beneficiaries.map((beneficiary) => (
                    <section className="beneficiary" key={`beneficiary--${beneficiary.id}`}>
                        <p>Name: {beneficiary?.beneficiary?.name}</p>
                        <p>Address: {beneficiary?.beneficiary?.address}</p>
                        <p>Phone Number: {beneficiary?.beneficiary?.phoneNumber}</p>
                        <p>Date of Birth: {beneficiary?.beneficiary?.dateOfBirth}</p>
                        <p>Relationship: {beneficiary?.beneficiary?.relationship}</p>
                        <p>Type: {getBeneficiaryTypeName(beneficiary)}</p>
                        <button onClick={() => handleBeneficiaryDelete(beneficiary)}>Delete</button>
                        <button onClick={() => handleBeneficiaryEdit(beneficiary.id)}>Edit</button>
                    </section>
                ))}
                {showAddBeneficiaryButton && (
                    <button className="addBeneficiary-button" onClick={AddNewBeneficiaryButtonClick}>
                        Add New Beneficiary
                    </button>
                )}
            </div>
            {isSecondaryBeneficiaryChanged && <p>Secondary Beneficiary Changed to Primary</p>}
        </>
    );
};
