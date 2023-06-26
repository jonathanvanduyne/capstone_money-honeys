import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdvisorInvestments, getAllCustomers, getCurrentAdvisorInfo } from "../../../APIManager.js";
import "./AdvisorInvestments.css"

export const AdvisorInvestmentsList = () => {

    const [advisorInvestments, setAdvisorInvestments] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchInvestments = async () => {
        const investments = await getAdvisorInvestments();
        setAdvisorInvestments(investments);
    };

    const fetchCurrentAdvisorInfo = async () => {
        const advisor = await getCurrentAdvisorInfo();
        setCurrentAdvisor(advisor);
    }

    const fetchCustomerInfo = async () => {
        const customerList = await getAllCustomers();
        setCustomers(customerList);
    }

    useEffect(
        () => {
            fetchInvestments();
            fetchCurrentAdvisorInfo();
            fetchCustomerInfo();
        }, []
    )

    const isLastNameEndsWithS = () => {
        const advisorLastName = currentAdvisor?.user?.lastName || "";
        return advisorLastName.charAt(advisorLastName.length - 1) === "s";
    };


    return (
        <div>
            <h2 className="advisor-name">
                {currentAdvisor?.user?.firstName}{" "}
                {isLastNameEndsWithS()
                    ? `${currentAdvisor?.user?.lastName}'`
                    : `${currentAdvisor?.user?.lastName}'s`}{" "}
                Investments
            </h2>

            {advisorInvestments.map((investment) => (
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