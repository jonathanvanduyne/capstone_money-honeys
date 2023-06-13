import { Link } from "react-router-dom";
import "./AdvisorPolicy.css";
import { AdvisorDeleteButton } from "../../APIManager.js";

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
            <p>Term: {term}</p>
            <footer>
                <AdvisorDeleteButton policyId={policyNumber} />
            </footer>
        </section>
    );
};
