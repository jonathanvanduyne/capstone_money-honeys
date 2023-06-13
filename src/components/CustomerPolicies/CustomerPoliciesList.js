import { useEffect, useState } from "react";
import { getAllPolicies, getAllAdvisors, getCurrentCustomerInfo } from "../../APIManager.js";
import "./Policy.css";
import { CustomerPolicy } from "./CustomerPolicy.js";

export const CustomerPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [advisors, setAllAdvisors] = useState([]);
    const [currentCustomerPolicies, setCurrentCustomerPolicies] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const policies = await getAllPolicies();
            setAllPolicies(policies);

            const advisors = await getAllAdvisors();
            setAllAdvisors(advisors);

            const currentCustomer = await getCurrentCustomerInfo();
            setCurrentCustomer(currentCustomer);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (currentCustomer) {
            const currentPolicies = allPolicies.filter(policy => policy?.customer?.userId === currentCustomer?.userId);
            setCurrentCustomerPolicies(currentPolicies);
        }
    }, [allPolicies, currentCustomer]);

    return (
        <>
            <h2>{currentCustomer?.user?.firstName} {currentCustomer?.user?.lastName} Policies</h2>

            <article className="policies">
                {currentCustomerPolicies.map((policy) => (
                    <CustomerPolicy key={`customerPolicy--${policy.id}`}
                        policyNumber={policy.id}
                        productId={policy?.product?.id}
                        startDate={policy?.startDate}
                        term={policy?.term}
                        advisorId={policy?.advisorId}
                        advisorFirstName={advisors.find((advisor) => advisor.id === policy.advisorId)?.user?.firstName}
                        advisorLastName={advisors.find((advisor) => advisor.id === policy.advisorId)?.user?.lastName}
                    />
                ))}
            </article>
        </>
    );
};
