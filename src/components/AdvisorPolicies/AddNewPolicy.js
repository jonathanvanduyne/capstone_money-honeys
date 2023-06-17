import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCustomers, getAllDurations, getAllProducts, getAllProductsTypes, getCurrentAdvisorInfo, } from "../../APIManager.js";

export const AddNewPolicy = () => {
    const [durations, setDurations] = useState([])
    const [customers, setCustomers] = useState([])
    const [currentAdvisor, setCurrentAdvisor] = useState([])
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])

    const navigate = useNavigate();

    const [policy, updatePolicy] = useState({
        customerId: 0,
        productId: 0,
        startDate: "",
        duration: "",
    });

    useEffect(() => {

        const fetchData = async () => {
            const productList = await getAllProducts();
            setProducts(productList);

            const allCustomers = await getAllCustomers()
            setCustomers(allCustomers)

            const advisor = await getCurrentAdvisorInfo()
            setCurrentAdvisor(advisor)

            const terms = await getAllDurations()
            setDurations(terms)

            const types = await getAllProductsTypes()
            setProductTypes(types)

        };

        fetchData();
    }, []);


    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const policyToSendToAPI = {
            customerId: policy.customerId,
            advisorId: currentAdvisor.id,
            productId: policy.productId,
            startDate: policy.startDate,
            durationId: policy.duration,
        };

        return fetch("http://localhost:8088/policies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(policyToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => navigate("/policies"));
    };

    return (
        <form className="policy_Form">
            <h2 className="policy_Form__title">Add New Policy</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer:</label>
                    <select
                        className="form-group"
                        value={policy.customerId}
                        onChange={(evt) => {
                            const copy = { ...policy };
                            copy.customerId = parseFloat(evt.target.value);
                            updatePolicy(copy);
                        }}
                    >
                        <option value="">Select a Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer?.user.firstName}{" "}{customer?.user?.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="product">Product:</label>
                    <select
                        className="form-group"
                        value={policy.productId}
                        onChange={(evt) => {
                            const copy = { ...policy };
                            copy.productId = parseFloat(evt.target.value);
                            updatePolicy(copy);
                        }}
                    >
                        <option value="">Select a Product</option>
                        {productTypes.map((productType) => (
                            <option key={productType.id} value={productType.id}>
                                {productType?.category}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        required
                        type="date"
                        placeholder="Policy Start Date"
                        className="form-group"
                        value={policy.startDate}
                        onChange={(evt) => {
                            const copy = { ...policy };
                            copy.startDate = evt.target.value;
                            updatePolicy(copy);
                        }}>
                    </input>
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="Duration">Duration:</label>
                    <select
                        className="form-group"
                        value={policy.duration}
                        onChange={(evt) => {
                            const copy = { ...policy };
                            copy.duration = parseInt(evt.target.value);
                            updatePolicy(copy);
                        }}
                    >
                        <option value="">Select a Duration</option>
                        {durations.map((duration) => (
                            <option key={duration.id} value={duration.id}>
                                {duration?.span}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Submit product
            </button>
        </form>
    );
};
