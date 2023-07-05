import React from "react";

export const PolicyModal = ({ policyId, handlePolicyDelete, setModal }) => {
    const handleLDeletePolicyClick = () => {
        handlePolicyDelete(policyId);
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
        <div className="policy-modal-container">
            <div className="policy-modal-content">
                <h3>Cancel Policy</h3>
                <p>Are you sure you want to cancel this investment?</p>
                <p></p>
                <div className="policy-modal-buttons">
                    <button onClick={handleLDeletePolicyClick} className="policy-modal-liquidate-button">
                        Yes, Cancel Policy
                    </button>
                    
                    <button onClick={handleCloseModal} className="policy-modal-cancel-button">
                        No, Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};
