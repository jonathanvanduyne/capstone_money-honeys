import React, { useEffect, useState } from "react";
import {
    getCurrentStockPrice,
    getHistoricalDayClosingPrice,
    getHistoricalStockSplits,
} from "../../../APIManager.js";
import "./AdvisorInvestments.css";
import { InvestmentGraphModal } from "./GraphModal.js";

export const AdvisorIndividualInvestments = ({ investment, symbol, customers }) => {
    const [currentInvestments, setCurrentInvestments] = useState([]);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const calculateInvestmentValue = async () => {
            // Get the initial amount invested
            const initialInvestment = investment.price;
            // Fetch the stock closing amount on the day of investment
            const historicalStockPrice = await getHistoricalDayClosingPrice(
                investment.stockSymbol.stockMarketSymbol
            );

            const historicalClosingDate = historicalStockPrice.find((day) => day.date === investment.startDate);

            if (!historicalClosingDate) {
                console.error("Historical closing price not found for the investment start date.");
                return;
            }

            const closingPriceOnDate = historicalClosingDate.close;

            // Calculate the number of units that could have been purchased with the initial amount
            let unitsOwned = initialInvestment / closingPriceOnDate;

            /*
            // Fetch the historical stock splits
            const stockSplitsResponse = await getHistoricalStockSplits(
              investment.stockSymbol.stockMarketSymbol
            );
            const stockSplits = stockSplitsResponse.historical;
      
      
            // Apply each stock split that occurred after the investment start date
            stockSplits.forEach((split) => {
              if (split.date > investment.startDate) {
                unitsOwned *= split.numerator / split.denominator;
              }
            });
            */

            // Fetch the current stock price and calculate the current investment value
            const stockPrice = await getCurrentStockPrice(investment.stockSymbol.stockMarketSymbol);
            const currentPrice = stockPrice[0].price;

            const updatedInvestment = {
                ...investment,
                currentPrice: currentPrice,
                currentInvestmentValue: currentPrice * unitsOwned,
                unitsOwned: unitsOwned,
            };

            setCurrentInvestments([updatedInvestment]);
            setHighlight(true);

            setTimeout(() => {
                setHighlight(false);
            }, 1000); // Reset highlight after 1 second
        };

        calculateInvestmentValue();
        const timer = setInterval(calculateInvestmentValue, 5000); // Refresh every 5 seconds

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, [investment]);

    return (
        <>
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
                <span className="investment-header">Initial Buy-In Amount:</span>{" "}
                <span className="investment-data">{investment.price}</span>
            </p>
            {currentInvestments.length > 0 && (
                <p>
                    <span className="investment-header">Current Investment Value:</span>{" "}
                    <span className={`investment-data ${highlight ? "highlight-animation" : ""}`}>
                        {currentInvestments[0].currentInvestmentValue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </p>
            )}
            <p>
                <span className="investment-header">Company Name:</span>{" "}
                <span className="investment-data">{investment.stockSymbol.companyName}</span>
            </p>

            <InvestmentGraphModal investment={investment} currentInvestments={currentInvestments} />
        </>
    );
};
