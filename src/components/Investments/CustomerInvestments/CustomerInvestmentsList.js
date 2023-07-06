import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdvisors, getCurrentCustomerInfo, getCustomerInvestments } from "../../../APIManager.js";
import "./CustomerInvestments.css"
import { CustomerIndividualInvestments } from "./CustomerIndividualInvestments.js";

export const CustomerInvestmentsList = () => {

    const [customerInvestments, setCustomerInvestments] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [advisors, setAdvisors] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {

        const investments = await getCustomerInvestments();
        setCustomerInvestments(investments);

        const customer = await getCurrentCustomerInfo();
        setCurrentCustomer(customer);

        const advisorList = await getAllAdvisors();
        setAdvisors(advisorList);
    }

    useEffect(
        () => {
            fetchData();
        }, []
    )

    const isLastNameEndsWithS = () => {
        const customerLastName = currentCustomer?.user?.lastName || "";
        return customerLastName.charAt(customerLastName.length - 1) === "s";
    };

    return (
        <>
            <h2 className="customer-name">
                {currentCustomer?.user?.firstName}{" "}
                {isLastNameEndsWithS()
                    ? `${currentCustomer?.user?.lastName}'`
                    : `${currentCustomer?.user?.lastName}'s`}{" "}
                Investments
            </h2>
            <div className="investment-cards-container">
                {customerInvestments.map((investment) => (
                    <div className="investment-card" key={investment.id}>
                        {investment.documentationURL === null ? (
                            ""
                        ) : (
                            <a
                                href={investment?.documentationURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Signed Policy
                            </a>
                        )}
                        <CustomerIndividualInvestments
                            investment={investment}
                            advisors={advisors}
                            fetchData={fetchData}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}      