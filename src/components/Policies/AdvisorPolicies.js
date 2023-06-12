import { useEffect, useState } from "react";
import { getAllCustomers, getAllPolicies, getCurrentAdvisorInfo, AdvisorDeleteButton } from "../../APIManager.js";
import "./Policy.css"

export const AdvisorPolicies = () => {
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
            const currentPolicies = allPolicies.filter(policy => policy.advisor.userId === currentAdvisor.userId);
            setCurrentAdvisorPolicies(currentPolicies);
        }

    }, [allPolicies, currentAdvisor]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <h2>List of Policies</h2>

            <article className="policies">
                {currentAdvisorPolicies.length > 0
                    ? (currentAdvisorPolicies.map((policy) => (
                        <section className="policy" key={`Id--${policy.id}`}>
                            <header>
                                <p>ID: {policy.id}</p>
                                <p>Customer:
                                    {`${customers.find(customer => customer.id === policy.customerId)?.user?.firstName} 
                                ${customers.find(customer => customer.id === policy.customerId)?.user?.lastName}`}
                                </p>
                            </header>
                            <p>Product ID: {policy.product.id}</p>
                            <p>Start Date: {policy.startDate}</p>
                            <p>Term: {policy.term}</p>
                            <footer>
                            <AdvisorDeleteButton policyId={policy.id} />
                        </footer>
                        </section>
                    )))
                    :
                    (
                        <p>No policies found for the current advisor.</p>
                    )}
            </article>
        </>
    );
}