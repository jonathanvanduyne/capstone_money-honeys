import { useEffect, useState } from "react";
import { getAllCustomers, getAllPolicies, getCurrentAdvisorInfo } from "../../APIManager.js";
import { AdvisorPolicy } from "./AdvisorPolicy.js";
import { useNavigate } from "react-router-dom";
import { UploadWidget } from "./UploadPolicy.js";
import "./AdvisorPolicy.css";


export const AdvisorPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [currentAdvisorPolicies, setCurrentAdvisorPolicies] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const policies = await getAllPolicies();
        setAllPolicies(policies);
    };

    const handleSignedPolicyUpload = () => {
        fetchData()
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchAdvisorInfo = async () => {
            const advisor = await getCurrentAdvisorInfo();
            setCurrentAdvisor(advisor);
        };

        const fetchCustomerInfo = async () => {
            const customerList = await getAllCustomers();
            setCustomers(customerList);
        };

        fetchData();
        fetchAdvisorInfo();
        fetchCustomerInfo();
    }, []);

    useEffect(() => {
        if (currentAdvisor && allPolicies.length > 0) {
            const currentPolicies = allPolicies.filter(
                (policy) => policy?.advisor?.userId === currentAdvisor?.userId
            );
            setCurrentAdvisorPolicies(currentPolicies);
        }
    }, [currentAdvisor, allPolicies]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handlePolicyDelete = async (policyId) => {
        await fetch(`http://localhost:8088/policies/${policyId}`, {
            method: "DELETE",
        });
        fetchData();
    };

    const handleNewPolicyButtonClick = () => {
        navigate("/AddNewPolicy");
    };

    //

    const DeleteSignedPolicyURL = async ({ policyNumber, productId, startDate, term, customerId, advisorId }) => {
        try {
            await fetch(`http://localhost:8088/policies/${policyNumber}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: customerId,
                    advisorId: advisorId,
                    productId: productId,
                    startDate: startDate,
                    durationId: term,
                    policyURL: null,
                }),
            });
            fetchData();
        } catch (error) {
            throw new Error("Failed to delete signed policy URL");
        }
    };

    //

    const SignedPolicyLinkAndDeleteButton = ({ url, policyNumber, productId, startDate, term, customerId, advisorId }) => {
        const handleDeleteClick = () => {
            DeleteSignedPolicyURL({
                policyNumber: policyNumber,
                productId: productId,
                startDate: startDate,
                term: term,
                customerId: customerId,
                advisorId: advisorId,
            });
        };

        return (
            <>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View Signed Policy
                </a>
                <button className="delete-signed-policy-button" onClick={handleDeleteClick}>
                    Delete Signed Policy
                </button>
            </>
        );
    };

    //

    return (
        <div className="page-container">
            <div className="nameAndButton"> <h2 className="advisor-name">
                {currentAdvisor?.user?.firstName} {currentAdvisor?.user?.lastName}'s Policies
            </h2>

                <button className="add-new-policy-button" onClick={handleNewPolicyButtonClick}>
                    Add Client Policy
                </button>
            </div>
            <div className="policy-list-container">
                {currentAdvisorPolicies.length > 0 ? (
                    currentAdvisorPolicies.map((policy) => (
                        <div className="policy-item" key={`customerPolicy--${policy.id}`}>
                            {policy.policyURL === null ? (
                                <UploadWidget
                                    className="upload-policy-button"
                                    policyNumber={policy.id}
                                    productId={policy?.product?.id}
                                    startDate={policy?.startDate}
                                    term={policy?.duration?.id}
                                    customerId={policy.customerId}
                                    advisorId={currentAdvisor.id}
                                    onSignedPolicyUpload={handleSignedPolicyUpload}
                                />
                            ) : (
                                <SignedPolicyLinkAndDeleteButton
                                    url={policy.policyURL}
                                    policyNumber={policy.id}
                                    productId={policy?.product?.id}
                                    startDate={policy?.startDate}
                                    term={policy?.duration?.id}
                                    customerId={policy.customerId}
                                    advisorId={currentAdvisor.id}
                                />
                            )}

                            <AdvisorPolicy
                                policyNumber={policy.id}
                                productId={policy?.product?.id}
                                startDate={policy?.startDate}
                                term={policy?.duration?.span}
                                customerId={policy.customerId}
                                customerFirstName={customers.find((customer) => customer.id === policy.customerId)?.user?.firstName}
                                customerLastName={customers.find((customer) => customer.id === policy.customerId)?.user?.lastName}
                            />
                            <button className="delete-policy-button" onClick={() => handlePolicyDelete(policy.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No policies found for the current advisor.</p>
                )}
            </div>
        </div>
    );
}