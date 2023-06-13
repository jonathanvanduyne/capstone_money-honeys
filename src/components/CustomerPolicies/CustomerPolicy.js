import { Link } from "react-router-dom";
import "./CustomerPolicy.css"

export const CustomerPolicy = ({ policyNumber, productId, startDate, term, advisors, advisorId, advisorFirstName, advisorLastName }) => {
    return (
        <>
            <article>
                <section className="policy">
                    <header>
                        <p>ID: {policyNumber}</p>
                        <p>
                            Advisor:{" "}
                            <Link to={`/${advisorId}`}>
                                {advisorFirstName}
                                {" "}
                                {advisorLastName}
                            </Link>
                        </p>
                    </header>
                    <p>Product ID: {productId}</p>
                    <p>Start Date: {startDate}</p>
                    <p>Term: {term}</p>
                </section>
            </article>
        </>
    );
};
