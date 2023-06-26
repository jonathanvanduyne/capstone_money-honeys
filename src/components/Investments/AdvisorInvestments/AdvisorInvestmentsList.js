import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdvisorInvestments, getAllCustomers, getCurrentAdvisorInfo } from "../../../APIManager.js";
import "./AdvisorInvestments.css"
import { UploadInvestmentWidget } from "./UploadInvestmentDocumentation.js";

export const AdvisorInvestmentsList = () => {

    const [advisorInvestments, setAdvisorInvestments] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const investments = await getAdvisorInvestments();
        setAdvisorInvestments(investments);

        const advisor = await getCurrentAdvisorInfo();
        setCurrentAdvisor(advisor);

        const customerList = await getAllCustomers();
        setCustomers(customerList);
    }

    const onDocumentationUpload = () => {
        fetchData();
    }

    useEffect(
        () => {
            fetchData();
        }, []
    )

    const isLastNameEndsWithS = () => {
        const advisorLastName = currentAdvisor?.user?.lastName || "";
        return advisorLastName.charAt(advisorLastName.length - 1) === "s";
    };

    const handleNewInvestmentPolicyButtonClick = () => {
        navigate("/addNewInvestment");
    }

    const handleInvestmentPolicyDelete = async (policyId) => {
        await fetch(`http://localhost:8088/investmentPolicies/${policyId}`, {
            method: "DELETE",
        });
        fetchData();
    };


    const deleteDocumentedInvestmentURL = async ({
        investmentId,
        customer,
        advisor,
        investmentDescription,
        duration,
        startDate,
        price,
        stockSymbol,
        fetchData,
    }) => {
        try {
            await fetch(`http://localhost:8088/investmentPolicies/${investmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: customer,
                    advisorId: advisor,
                    investmentDescriptionId: investmentDescription,
                    durationId: duration,
                    startDate: startDate,
                    price: price,
                    stockSymbolId: stockSymbol,
                    documentationURL: null,
                }),
            });
            fetchData();
        } catch (error) {
            console.log(error)
        }
    };

    const DocumentedInvestmentLinkAndDeleteButton = ({ investmentId, customer, advisor, investmentDescription, duration, startDate, price, stockSymbol, url, }) => {

        const handleDeleteClick = () => {
            deleteDocumentedInvestmentURL({
                investmentId: investmentId,
                customer: customer,
                advisor: advisor,
                investmentDescription: investmentDescription,
                duration: duration,
                startDate: startDate,
                price: price,
                stockSymbol: stockSymbol,
                fetchData: onDocumentationUpload,
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
        <div>
            <h2 className="advisor-name">
                {currentAdvisor?.user?.firstName}{" "}
                {isLastNameEndsWithS()
                    ? `${currentAdvisor?.user?.lastName}'`
                    : `${currentAdvisor?.user?.lastName}'s`}{" "}
                Investments
            </h2>

            <p className="total-investment">
                Total Investment Buy-In Amount:{" "}
                <span className="investment-data">
                    ${advisorInvestments.reduce(
                        (total, investment) => total + investment.price,
                        0
                    )}
                </span>
            </p>

            <button onClick={handleNewInvestmentPolicyButtonClick}>Add New Investment</button>

            {advisorInvestments.map((investment) => (
                <div className="investment-card" key={investment.id}>
                    {investment.documentationURL === null ? (
                        <UploadInvestmentWidget
                            investmentId={investment.id}
                            customer={investment.customerId}
                            advisor={investment.advisorId}
                            investmentDescription={investment.investmentDescriptionId}
                            duration={investment.durationId}
                            startDate={investment.startDate}
                            price={investment.price}
                            stockSymbol={investment.stockSymbolId}
                            fetchData={onDocumentationUpload}
                        />
                    ) : (
                        <DocumentedInvestmentLinkAndDeleteButton
                            investmentId={investment.id}
                            customer={investment.customerId}
                            advisor={investment.advisorId}
                            investmentDescription={investment.investmentDescriptionId}
                            duration={investment.durationId}
                            startDate={investment.startDate}
                            price={investment.price}
                            stockSymbol={investment.stockSymbolId}
                            fetchData={onDocumentationUpload}
                            url={investment.documentationURL}
                        />
                    )}
                    <p>
                        <span className="investment-header">Investment ID:</span>{" "}
                        <span className="investment-data">{investment.id}</span>
                    </p>
                    <p>
                        <span className="investment-header">Customer Name:</span>{" "}
                        <span className="investment-data">
                            {customers
                                .filter((customer) => customer.id === investment.customerId)
                                .map((customer) => customer.user.firstName + " " + customer.user.lastName)}
                        </span>
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
                    <button className="delete-policy-button" onClick={() => handleInvestmentPolicyDelete(investment.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
