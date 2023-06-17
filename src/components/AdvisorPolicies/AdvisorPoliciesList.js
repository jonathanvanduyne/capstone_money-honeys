import { useEffect, useState } from "react";
import "./AdvisorPolicy.css";
import { getAllCustomers, getAllPolicies, getCurrentAdvisorInfo } from "../../APIManager.js";
import { AdvisorPolicy } from "./AdvisorPolicy.js";
import { useNavigate } from "react-router-dom";

export const AdvisorPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [currentAdvisorPolicies, setCurrentAdvisorPolicies] = useState([]);
    const navigate = useNavigate()

    const fetchData = async () => {
        const policies = await getAllPolicies();
        setAllPolicies(policies);
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            const currentPolicies = allPolicies.filter(policy => policy?.advisor?.userId === currentAdvisor?.userId);
            setCurrentAdvisorPolicies(currentPolicies);
        }
    }, [currentAdvisor, allPolicies]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handlePolicyDelete = async (policyId) => {
        await fetch(`http://localhost:8088/policies/${policyId}`, {
            method: "DELETE"
        });
        fetchData(); // Re-fetch policies after deletion
    };

    const handleNewPolicyButtonClick = () => {
        navigate("/AddNewPolicy")
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <h2>{currentAdvisor?.user?.firstName} {currentAdvisor?.user?.lastName}'s Policies</h2>

            <button className="policy-button" onClick={handleNewPolicyButtonClick}>Add Client Policy</button>

            <article className="policies">
                {currentAdvisorPolicies.length > 0 ? (
                    currentAdvisorPolicies.map((policy) => (
                        <div key={`customerPolicy--${policy.id}`}>
                            <AdvisorPolicy
                                policyNumber={policy.id}
                                productId={policy?.product?.id}
                                startDate={policy?.startDate}
                                term={policy?.duration?.span}
                                customerId={policy.customerId}
                                customerFirstName={customers.find(customer => customer.id === policy.customerId)?.user?.firstName}
                                customerLastName={customers.find(customer => customer.id === policy.customerId)?.user?.lastName}
                            />
                            <button onClick={() => handlePolicyDelete(policy.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No policies found for the current advisor.</p>
                )}
            </article>
        </>
    );
};
