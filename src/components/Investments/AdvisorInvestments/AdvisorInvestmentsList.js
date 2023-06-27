import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdvisorInvestments, getAllCustomers, getCurrentAdvisorInfo, getCurrentStockPrice } from "../../../APIManager.js";
import "./AdvisorInvestments.css"
import { UploadInvestmentWidget } from "./UploadInvestmentDocumentation.js";
import { IndividualInvestments } from "./IndividualInvestments.js";

export const AdvisorInvestmentsList = () => {

    const [advisorInvestments, setAdvisorInvestments] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const investments = await getAdvisorInvestments();

        // Fetch current stock prices for each investment
        const updatedInvestments = await Promise.all(
            investments.map(async (investment) => {
                const stockPrice = await getCurrentStockPrice(investment.stockSymbol.stockMarketSymbol);
                const currentPrice = stockPrice[0].price;
                return {
                    ...investment,
                    currentPrice: currentPrice,
                };
            })
        );

        setAdvisorInvestments(updatedInvestments);

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

            <p className="total-investment">
                Total Current Investment Amount:{" "}
                <span className="investment-data">
                    ${advisorInvestments.reduce(
                        (total, investment) => total + investment.currentInvestmentAmount,
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
                    <IndividualInvestments
                        investment={investment}
                        customers={customers}
                        fetchData={fetchData} />

                    <button className="delete-policy-button" onClick={() => handleInvestmentPolicyDelete(investment.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
