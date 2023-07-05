import { useState, useEffect } from "react";
import { getAllProducts } from "../../APIManager.js";
import "./Products.css"

import { useNavigate } from "react-router-dom";

export const ProductList = () => {
    const [products, updateProducts] = useState([]);
    const navigate = useNavigate()

    const fetchData = async () => {
        const products = await getAllProducts();
        updateProducts(products);
    };

    useEffect(() => {

        fetchData();
    }, []);

    const handleButtonClick = () => {
        navigate("/AddNewProduct")
    }

    const handleDelete = async (product) => {
        await fetch(`http://localhost:8088/products/${product.id}`, {
            method: "DELETE",
        });
        fetchData();
    };

    return (
        <>
            <div className="product-container">
                <h2 className="product-title product-title-large">List of Products</h2>

                <button className="add-new-product-button add-new-product-button-large" onClick={handleButtonClick}>
                    Add New Product
                </button>

                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-item" key={`product--${product.id}`}>
                            <div className="product-section">
                                <header>ID: {product?.id}</header>
                                <p>Type: {product?.productType?.category}</p>
                                <p>Price: {product?.price}</p>
                                <p>Billing Frequency: {product?.billingFrequency?.frequency}</p>
                            </div>
                            <button onClick={() => handleDelete(product)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
                    }