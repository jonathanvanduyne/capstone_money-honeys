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
        document.body.classList.add("modal-open");
    };

    const handleModalClose = () => {
        document.body.classList.remove("modal-open");
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h3>Sell Investment</h3>
                <p>Are you sure you want to liquidate this investment?

                    <p>This action cannot be undone.</p>
                </p>
                <div className="modal-buttons">
                    <button onClick={handleLiquidateInvestment} className="modal-liquidate-button">
                        Yes I'm sure.
                        Show Me the Money!
                        Liquidate Investment.
                    </button>
                    <button onClick={handleCloseModal} className="modal-cancel-button">
                        Oops, not right now. Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
