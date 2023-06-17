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
            <h2>List of Products</h2>

            <button className="product-button" onClick={handleButtonClick}>Add New Product</button>

            <article className="products">
                {products.map((product) => (
                    <section className="product" key={`product--${product.id}`}>
                        <header>ID: {product?.id}</header>
                        <p>Type: {product?.productType?.category}</p>
                        <p>Price: {product?.price}</p>
                        <p>Billing Frequency: {product?.billingFrequency?.frequency}</p>
                    </section>
                ))}
            </article>
        </>
    );
};
