import React, { useEffect, useState } from "react";
import { getHistoricalDayClosingPrice } from "../../../APIManager.js";
import { format, differenceInDays, addDays } from "date-fns";
import { CanvasJSChart } from "canvasjs-react-charts";
import "./CustomerGraphModal.css"

export const CustomerGraphModal = ({ investment, currentInvestments }) => {
    const [stockData, setStockData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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

    const getInvestmentStartDate = () => {
        return new Date(investment.startDate);
    };

    const getCurrentDate = () => {
        return new Date();
    };

    const filterChartData = () => {
        const startDate = getInvestmentStartDate();
        const endDate = getCurrentDate();

        const filteredData = chartData.filter((entry) => {
            return entry.date >= startDate && entry.date <= endDate;
        });

        return filteredData;
    };

    const filteredChartData = filterChartData();

    const handleShowGraph = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button className="modal-graph-button" onClick={handleShowGraph}>Show Graph</button>
            {modalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <button onClick={handleCloseModal} className="modal-close-button">
                            Close
                        </button>
                        <h3>Investment Performance</h3>
                        {stockData.length > 0 ? (
                            <CanvasJSChart
                                options={{
                                    theme: "light2",
                                    title: {
                                        text: `${investment.stockSymbol.companyName}'s performance since you invested on ${investment.startDate}`,
                                    },
                                    data: [
                                        {
                                            type: "line",
                                            xValueFormatString: "YYYY-MM-DD",
                                            yValueFormatString: "$#,##0.00",
                                            dataPoints: filteredChartData.map((entry) => ({
                                                x: entry.date,
                                                y: entry.close * currentInvestments[0].unitsOwned,
                                            })),
                                        },
                                    ],
                                }}
                            />
                        ) : (
                            <p>Loading investment data...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
