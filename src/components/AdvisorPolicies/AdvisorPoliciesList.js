import { useEffect, useState } from "react";
import { getAllCustomers, getAllPolicies, getAllProducts, getCurrentAdvisorInfo } from "../../APIManager.js";
import { AdvisorPolicy } from "./AdvisorPolicy.js";
import { useNavigate } from "react-router-dom";
import { UploadPolicyWidget } from "./UploadPolicy.js";
import "./AdvisorPolicy.css";
import "./PolicyModal.css"
import { PolicyModal } from "./PolicyModal.js";

export const AdvisorPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [currentAdvisorPolicies, setCurrentAdvisorPolicies] = useState([]);
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const policies = await getAllPolicies();
        setAllPolicies(policies);

        const advisor = await getCurrentAdvisorInfo();
        setCurrentAdvisor(advisor);

        const customerList = await getAllCustomers();
        setCustomers(customerList);

        const productList = await getAllProducts();
            setProducts(productList);
    };

    const handleSignedPolicyUpload = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (currentAdvisor && allPolicies.length > 0) {
            const currentPolicies = allPolicies.filter(
                (policy) => policy?.advisor?.userId === currentAdvisor?.userId
            );
            setCurrentAdvisorPolicies(currentPolicies);
        }
    }, [currentAdvisor, allPolicies]);

    const handlePolicyDelete = async (policyId) => {
        await fetch(`http://localhost:8088/policies/${policyId}`, {
            method: "DELETE",
        });
        fetchData();
    };

    const handleNewPolicyButtonClick = () => {
        navigate("/AddNewPolicy");
    };

    const isLastNameEndsWithS = () => {
        const advisorLastName = currentAdvisor?.user?.lastName || "";
        return advisorLastName.charAt(advisorLastName.length - 1) === "s";
    };

    const DeleteSignedPolicyURL = async ({
        policyNumber,
        productId,
        startDate,
        term,
        customerId,
        advisorId,
    }) => {
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
    };



    const SignedPolicyLinkAndDeleteButton = ({ url, policyNumber, productId, startDate, term, customerId, advisorId, }) => {
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

    return (
        <div className="page-container">
            <div className="nameAndButton">
                <h2 className="advisor-name">
                    {currentAdvisor?.user?.firstName}{" "}
                    {isLastNameEndsWithS() ? `${currentAdvisor?.user?.lastName}'` : `${currentAdvisor?.user?.lastName}'s`} Policies
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
                                <UploadPolicyWidget
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
                                products={products}
                            />
                            <button className="delete-policy-button" onClick={() => setModal(policy.id)}>
                                Delete
                            </button>

                            {modal && (
                                <PolicyModal
                                    policyId={modal}
                                    handlePolicyDelete={handlePolicyDelete}
                                    setModal={setModal}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No policies found for the current advisor.</p>
                )}
            </div>
        </div>
    );
};
