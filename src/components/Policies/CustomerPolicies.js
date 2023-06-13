import { useEffect, useState } from "react";
import { getAllPolicies, getAllAdvisors, getCurrentCustomerInfo } from "../../APIManager.js";
import "./Policy.css"

export const CustomerPolicies = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [advisors, setAllAdvisors] = useState([]);
    const [currentCustomerPolicies, setCurrentCustomerPolicies] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState([])

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
            const currentPolicies = allPolicies.filter(policy => policy.customer?.userId === currentCustomer.userId);
            setCurrentCustomerPolicies(currentPolicies);
        }
    }, [allPolicies, currentCustomer]);
    

    return (
        <>
            <h2>{currentCustomer?.user?.firstName} {currentCustomer?.user?.lastName} Policies</h2>

            <article className="policies">
                {currentCustomerPolicies.map((policy) => (
                    <section className="policy" key={`Id--${policy.id}`}>
                        <header>
                            <p>ID: {policy.id}</p>
                            <p>
                                Advisor:{" "}
                                {`${advisors.find(advisor => advisor.id === policy.advisorId)?.user?.firstName}`}
                                {" "}
                                {`${advisors.find(advisor => advisor.id === policy.advisorId)?.user?.lastName}`}
                            </p>
                        </header>
                        <p>Product ID: {policy.product.id}</p>
                        <p>Start Date: {policy.startDate}</p>
                        <p>Term: {policy.term}</p>
                    </section>
                ))}
            </article>
        </>
    )
}