import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdvisors, getCurrentCustomerInfo, getCustomerInvestments } from "../../../APIManager.js";
import "./CustomerInvestments.css"

export const CustomerInvestmentsList = () => {

    const [customerInvestments, setCustomerInvestments] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [advisors, setAdvisors] = useState([]);
    const navigate = useNavigate();

    const fetchInvestments = async () => {
        const investments = await getCustomerInvestments();
        setCustomerInvestments(investments);
    };

    const fetchCurrentCustomerInfo = async () => {
        const customer = await getCurrentCustomerInfo();
        setCurrentCustomer(customer);
    }

    const fetchCustomerInfo = async () => {
        const advisorList = await getAllAdvisors();
        setAdvisors(advisorList);
    }

    useEffect(
        () => {
            fetchInvestments();
            fetchCurrentCustomerInfo();
            fetchCustomerInfo();
        }, []
    )

    const isLastNameEndsWithS = () => {
        const customerLastName = currentCustomer?.user?.lastName || "";
        return customerLastName.charAt(customerLastName.length - 1) === "s";
    };


    return (
        <div>
            <h2 className="customer-name">
                {currentCustomer?.user?.firstName}{" "}
                {isLastNameEndsWithS()
                    ? `${currentCustomer?.user?.lastName}'`
                    : `${currentCustomer?.user?.lastName}'s`}{" "}
                Investments
            </h2>

            {customerInvestments.map((investment) => (
                <div className="investment-card" key={investment.id}>
                    <p>
                        <span className="investment-header">Investment ID:</span>{" "}
                        <span className="investment-data">{investment.id}</span>
                    </p>
                    <p>
                        <span className="investment-header">Start Date:</span>{" "}
                        <span className="investment-data">{investment.startDate}</span>
                    </p>
                    <p>
                        <span className="investment-header">Buy-In Amount:</span>{" "}
                        <span className="investment-data">{investment.price}</span>
                    </p>
                    <p>
                        <span className="investment-header">Company Name:</span>{" "}
                        <span className="investment-data">
                            {investment.stockSymbol.companyName}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
            }