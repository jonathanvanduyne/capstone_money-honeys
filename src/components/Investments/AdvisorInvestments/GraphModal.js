import React, { useEffect, useState } from "react";
import { getHistoricalDayClosingPrice } from "../../../APIManager.js";
import { format } from "date-fns";
import { CanvasJSChart } from "canvasjs-react-charts";

export const InvestmentGraphModal = ({ investment }) => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const historicalData = await getHistoricalDayClosingPrice(
                    investment.stockSymbol.stockMarketSymbol
                );
                setStockData(historicalData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [investment]);

    const formatData = (data) => {
        return data.map((entry) => ({
            date: new Date(entry.date),
            close: entry.close,
        }));
    };

    const chartData = formatData(stockData);

    const renderChart = () => {
        const options = {
            theme: "light2",
            title: {
                text: "Investment Performance",
            },
            rangeSelector: {
                inputFields: {
                    enabled: false,
                },
                buttons: [
                    {
                        range: 30, // 30 days
                        label: "1M",
                        rangeType: "day",
                    },
                    // Add other range buttons as needed
                ],
                buttonClick: (e) => {
                    const rangeType = e.dataPoint.rangeType;
                    const range = e.dataPoint.range;
                    const newStart = new Date();
                    newStart.setDate(newStart.getDate() - range);

                    // Fetch new data based on the selected range
                    fetchHistoricalData(newStart, new Date(), rangeType);
                },
            },
            data: [
                {
                    type: "line",
                    xValueFormatString: "YYYY-MM-DD",
                    yValueFormatString: "$#,##0.00",
                    dataPoints: chartData.map((entry) => ({
                        x: entry.date,
                        y: entry.close,
                    })),
                },
            ],
        };

        return <CanvasJSChart options={options} />;
    };

    const fetchHistoricalData = async (start, end, rangeType) => {
        try {
            // Use the start and end dates to fetch historical data
            const historicalData = await getHistoricalDayClosingPrice(
                investment.stockSymbol.stockMarketSymbol,
                format(start, "yyyy-MM-dd"),
                format(end, "yyyy-MM-dd")
            );
            setStockData(historicalData);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
    };

    return (
        <>
            <h3>Investment Performance</h3>
            {stockData.length > 0 ? (
                renderChart()
            ) : (
                <p>Loading investment data...</p>
            )}
        </>
    );
};
