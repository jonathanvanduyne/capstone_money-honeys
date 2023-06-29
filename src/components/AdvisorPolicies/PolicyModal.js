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
        <div className="modal-container">
            <div className="modal-content">
                <h3>Cancel Policy</h3>
                <p>Are you sure you want to cancel this investment?</p>
                <div className="modal-buttons">
                    <button onClick={handleLDeletePolicyClick} className="modal-liquidate-button">
                        Yes, Cancel Policy
                    </button>
                    <button onClick={handleCloseModal} className="modal-cancel-button">
                        No, Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};
