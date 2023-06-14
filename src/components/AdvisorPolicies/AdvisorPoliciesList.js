import { useEffect, useState } from "react";
import "./AdvisorPolicy.css"
import { getAllCustomers, getAllPolicies, getCurrentAdvisorInfo } from "../../APIManager.js";
import { AdvisorPolicy } from "./AdvisorPolicy.js";

export const AdvisorPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([])
    const [currentAdvisorPolicies, setCurrentAdvisorPolicies] = useState([]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchData = async () => {
            const policies = await getAllPolicies();
            setAllPolicies(policies);
        };

        const fetchAdvisorInfo = async () => {
            const advisor = await getCurrentAdvisorInfo();
            setCurrentAdvisor(advisor);
        };

        const fetchCustomerInfo = async () => {
            const customerlist = await getAllCustomers();
            setCustomers(customerlist);
        };

        fetchData();
        fetchAdvisorInfo();
        fetchCustomerInfo();
    }, []);

    //

    useEffect(() => {
        if (currentAdvisor) {
            const currentPolicies = allPolicies.filter(policy => policy?.advisor?.userId === currentAdvisor?.userId);
            setCurrentAdvisorPolicies(currentPolicies);
        }

    }, [allPolicies, currentAdvisor]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <h2>{currentAdvisor?.user?.firstName} {currentAdvisor?.user?.lastName}'s Policies</h2>

            <article className="policies">
                {currentAdvisorPolicies.length > 0 ? (
                    currentAdvisorPolicies.map((policy) => (
                        <AdvisorPolicy
                            key={`customerPolicy--${policy.id}`}
                            policyNumber={policy.id}
                            productId={policy?.product?.id}
                            startDate={policy?.startDate}
                            term={policy?.term}
                            customerId={policy.customerId}
                            customerFirstName={customers.find(customer => customer.id === policy.customerId)?.user?.firstName}
                            customerLastName={customers.find(customer => customer.id === policy.customerId)?.user?.lastName}
                        />
                    ))
                ) : (
                    <p>No policies found for the current advisor.</p>
                )}
            </article>
        </>
    );
}      