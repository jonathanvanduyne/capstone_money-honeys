import { useEffect, useState } from "react";
import { getAllPolicies, getAllAdvisors, getCurrentCustomerInfo, getAllProducts } from "../../APIManager.js";
import "./CustomerPolicy.css";
import { Link } from "react-router-dom";

export const CustomerPolicyList = () => {
    const [allPolicies, setAllPolicies] = useState([]);
    const [advisors, setAllAdvisors] = useState([]);
    const [currentCustomerPolicies, setCurrentCustomerPolicies] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [products, setCurrentProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const policies = await getAllPolicies();
            setAllPolicies(policies);

            const advisors = await getAllAdvisors();
            setAllAdvisors(advisors);

            const currentCustomer = await getCurrentCustomerInfo();
            setCurrentCustomer(currentCustomer);

            const products = await getAllProducts();
            setCurrentProducts(products);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (currentCustomer) {
            const currentPolicies = allPolicies.filter((policy) => policy?.customer?.userId === currentCustomer?.userId);
            setCurrentCustomerPolicies(currentPolicies);
        }
    }, [allPolicies, currentCustomer]);

    const isLastNameEndsWithS = () => {
        const lastName = currentCustomer?.user?.lastName || "";
        return lastName.charAt(lastName.length - 1) === "s";
    };

    return (
        <section className="page-container">
            <h2 className="customer-name">
                {currentCustomer?.user?.firstName}{isLastNameEndsWithS() ? "'" : "'s"} Policies
            </h2>

            <article className="policy-list-container">
                {currentCustomerPolicies.map((policy) => (
                    <div className="customer-policy" key={`customerPolicy--${policy.id}`}>
                        {policy.policyURL === null ? (
                            ""
                        ) : (
                            <a href={policy?.policyURL} target="_blank" rel="noopener noreferrer">
                                View Signed Policy
                            </a>
                        )}
                        <header>
                            <p className="policy-id">ID: {policy.id}</p>
                            <p className="policy-advisor">
                                Advisor:{" "}
                                <Link to={`/${policy.advisorId}`}>
                                    {advisors.find((advisor) => advisor.id === policy.advisorId)?.user?.firstName}{" "}
                                    {advisors.find((advisor) => advisor.id === policy.advisorId)?.user?.lastName}
                                </Link>
                            </p>
                        </header>
                        <p className="policy-product-id">Product ID: {policy.productId}</p>
                        <p className="policy-product-name">
                            Product Name:{" "}
                            {products.find((product) => product.id === policy.productId)?.productType.category}
                        </p>
                        <p className="policy-start-date">Start Date: {policy.startDate}</p>
                        <p className="policy-term">Term: {policy.duration?.span}</p>
                    </div>
                ))}
            </article>
        </section>
    );
};
