import { Link } from "react-router-dom";
import "./AdvisorPolicy.css";

export const AdvisorPolicy = ({ policyNumber, productId, startDate, term, customerId, customerFirstName, customerLastName }) => {
    return (
        <section className="policy" key={`Policy Id--${policyNumber}`}>
            <header>
                <p>ID: {policyNumber}</p>
                <p>
                    Customer:{" "}
                    <Link to={`/${customerId}`}>
                        {`${customerFirstName}
                        ${customerLastName}`}
                    </Link>
                </p>
            </header>
            <p>Product ID: {productId}</p>
            <p>Start Date: {startDate}</p>
            <p>Duration: {term}</p>
        </section>
    );
};
