import { useEffect, useState } from "react";
import { getHistoricalDayClosingPrice } from "../../../APIManager.js";
import { Line } from "react-chartjs-2";

export const InvestmentGraphModal = ({ investment }) => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const historicalData = await getHistoricalDayClosingPrice(investment.stockSymbol.stockMarketSymbol);
                setStockData(historicalData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [investment]);

    const formatData = (data) => {
        const investmentAnniversaries = stockData.reduce((anniversaries, entry) => {
            const entryYear = new Date(entry.date).getFullYear();
            if (!anniversaries.includes(entryYear)) {
                anniversaries.push(entryYear);
            }
            return anniversaries;
        }, []);

        return data
            .filter((entry) => {
                const entryYear = new Date(entry.date).getFullYear();
                return investmentAnniversaries.includes(entryYear);
            })
            .map((entry) => ({
                x: new Date(entry.date),
                y: entry.close,
            }));
    };

    const chartData = {
        datasets: [
            {
                label: "Closing Price",
                data: formatData(stockData),
                borderColor: "#8884d8",
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                title: {
                    text: "Price",
                },
                type: "linear", // Add this line to specify the scale type as linear
            },
        },
    };

    return (
        <>
            <h3>Investment Performance</h3>
            {stockData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
            ) : (
                <p>Loading investment data...</p>
            )}
        </>
    );
};
