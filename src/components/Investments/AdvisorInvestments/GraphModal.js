import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const InvestmentGraphModal = ({ investment }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const investmentData = {
    // Generate the data for the line graph
    labels: investment.years,
    datasets: [
      {
        label: "Investment Value Over Time",
        data: investment.values,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={`modal ${modalOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h3>Investment Value Over Time</h3>
        <div className="chart-container">
          <Line data={investmentData} />
        </div>
      </div>
    </div>
  );
};

export const AdvisorIndividualInvestments = ({ investment, customers, fetchData }) => {
  // ...

  const handleGraphButtonClick = () => {
    setModal(investment.id);
  };

  // ...

  return (
    <>
      {/* ... */}
      <button className="graph-button" onClick={handleGraphButtonClick}>
        View Graph
      </button>
      {/* ... */}
    </>
  );
};
