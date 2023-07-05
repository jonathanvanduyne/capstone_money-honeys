import React from "react";

export const AdvisorModal = ({ investmentId, handleInvestmentPolicyDelete, setModal }) => {
    const handleLiquidateInvestment = () => {
        handleInvestmentPolicyDelete(investmentId);
        setModal(null);
    };

    const handleCloseModal = () => {
        setModal(null);
    };

    const handleModalOpen = () => {
        document.body.classList.add("advisor-sell-modal-open");
    };

    const handleModalClose = () => {
        document.body.classList.remove("advisor-sell-modal-open");
    };

    return (
        <div className="advisor-sell-modal-container">
            <div className="advisor-sell-modal-content">
                <h3 className="advisor-sell-modal-heading">Sell Investment</h3>
                <p className="advisor-sell-modal-text">Are you sure you want to liquidate this investment?</p>
                <p className="advisor-sell-modal-text">This action cannot be undone.</p>
                <div className="advisor-sell-modal-buttons">
                    <button onClick={handleLiquidateInvestment} className="advisor-sell-modal-liquidate-button">
                        Yes I'm sure. Sell.
                    </button>
                    <button onClick={handleCloseModal} className="advisor-sell-modal-cancel-button">
                        Oops, not right now. Cancel
                    </button>
                    
                </div>
            </div>
        </div>
    );
};
