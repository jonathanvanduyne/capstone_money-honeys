import { Link } from "react-router-dom";
import "./AdvisorPolicy.css";

export const AdvisorPolicy = ({ policyNumber, productId, startDate, term, customerId, customerFirstName, customerLastName, products }) => {
    return (
        <section className="policy" key={`Policy Id--${policyNumber}`}>
            <header className="policy-header">
                <p>ID: {policyNumber}</p>
                <p>
                    Customer:{" "}
                    <Link to={`/${customerId}`} className="policy-header-text">
                        {`${customerFirstName} ${customerLastName}`}
                    </Link>
                </p>
            </header>
            <div className="policy-info">
                <p>
                    Product ID: <span className="policy-header-text">{productId}</span>
                </p>
                <p className="policy-product-name">
                            Product Name:{" "}
                            {products.find((product) => product.id === productId)?.productType.category}
                        </p>
                <p>
                    Start Date: <span className="policy-header-text">{startDate}</span>
                </p>
                <p>
                    Term: <span className="policy-header-text">{term}</span>
                </p>
            </div>
        </section>
    );
};
