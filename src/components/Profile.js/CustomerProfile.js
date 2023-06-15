import { useEffect, useState } from "react";
import { getAllBeneficiaryTypes, getBeneficiaryBridges, getCurrentCustomerBeneficiaries, getCurrentCustomerInfo } from "../../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const CustomerProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [beneficiariesTypes, setBeneficiaryTypes] = useState([]);
    const [beneficiaryBridges, setBeneficiaryBridges] = useState([]);
    const navigate = useNavigate();

    const fetchCustomer = async () => {
        const currentCustomer = await getCurrentCustomerInfo();
        setCurrentUser(currentCustomer);
    }

    const fetchBeneficiaryData = async () => {
        const customerBeneficiaries = await getCurrentCustomerBeneficiaries();
        setBeneficiaries(customerBeneficiaries);


        const beneficiaryTypes = await getAllBeneficiaryTypes();
        setBeneficiaryTypes(beneficiaryTypes);

        const beneficiaryBridges = await getBeneficiaryBridges();
        setBeneficiaryBridges(beneficiaryBridges);

    };

    useEffect(() => {

        fetchCustomer()
        fetchBeneficiaryData();
    }, []);

    const getBeneficiaryTypeName = (parameter) => {
        const beneficiaryTypeId = parameter?.beneficiary?.typeId;
        const category = beneficiariesTypes.find(type => type.id === beneficiaryTypeId);
        return category?.category
    };

    const handleBeneficiaryDelete = async (beneficiaryId) => {
        await fetch(`http://localhost:8088/beneficiaries/${beneficiaryId}`, {
            method: "DELETE"
        });

        const bridgeTable = beneficiaryBridges.find(bridge => beneficiaryId === bridge?.beneficiaryId)
        await fetch(`http://localhost:8088/beneficiaryBridges/${bridgeTable.id}`, {
            method: "DELETE"
        });
        fetchBeneficiaryData();
    };

    const handleBeneficiaryEdit = (beneficiaryId) => {
        navigate(`/profile/editBeneficiary/${beneficiaryId}`)
    }

const AddNewBeneficiaryButtonClick = () => {
    navigate("/addNewBeneficiary")
}
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
                        <button onClick={() => handleBeneficiaryDelete(beneficiary.id)}>Delete</button>
                        <button onClick={() => handleBeneficiaryEdit(beneficiary.id)}>Edit</button>
                    </section>
                ))}
            <button className="addBeneficiary-button" onClick={AddNewBeneficiaryButtonClick}>Add New Beneficiary</button>
            </div>
        </>
    );
};