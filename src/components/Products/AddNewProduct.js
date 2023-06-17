import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBillingFrequencies, getAllProductsTypes } from "../../APIManager.js";
import "./Products.css"


export const AddNewProduct = () => {
    const [product, update] = useState({
        productTypeId: "",
        price: 0,
        billingFrequencyId: "",
    });
    const [productTypes, setProductTypes] = useState([]);
    const [billingFrequencies, setBillingFrequencies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const types = await getAllProductsTypes();
            setProductTypes(types);

            const frequencies = await getAllBillingFrequencies();
            setBillingFrequencies(frequencies);
        };

        fetchData();
    }, []);


    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const productToSendToAPI = {
            productTypeId: product.productTypeId,
            price: product.price,
            billingFrequencyId: product.billingFrequencyId,
        };

        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => navigate("/productList"));
    };

    return (
        <form className="productForm">
            <h2 className="productForm__title">Add New Product</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <select
                        className="form-group"
                        value={product.typeId}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.productTypeId = parseFloat(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select a Product Type</option>
                        {productTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type?.category}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Price">Price:</label>
                    <input
                        required
                        autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Product Price Here"
                        value={product.price}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.price = parseFloat(evt.target.value);
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="billingFrequency">Billing Frequency:</label>
                    <select
                        className="form-group"
                        value={product.billingFrequency}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.billingFrequencyId = parseFloat(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select a Billing Frequency</option>
                        {billingFrequencies.map((frequency) => (
                            <option key={frequency.id} value={frequency.id}>
                                {frequency.frequency}
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
