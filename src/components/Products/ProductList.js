import { useState, useEffect } from "react";
import { getAllProducts } from "../../APIManager.js";
import "./Products.css"

import { useNavigate } from "react-router-dom";

export const ProductList = () => {
    const [products, updateProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            const products = await getAllProducts();
            updateProducts(products);
        };

        fetchData();
    }, []);

    const handleButtonClick = () => {
        navigate("/AddNewProduct")
    }

    return (
        <>
            <div className="product-container">
                <h2 className="product-title">List of Products</h2>

                <button className="add-new-product-button" onClick={handleButtonClick}>
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
                            <button>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}