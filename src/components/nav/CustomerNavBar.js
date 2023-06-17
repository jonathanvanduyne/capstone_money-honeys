import { Link, useNavigate } from "react-router-dom";
import { getCurrentCustomerInfo } from "../../APIManager.js";
import { useEffect, useState } from "react";
import "./NavBar.css";

export const CustomerNavBar = () => {
    const navigate = useNavigate();
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const customerNavBarName = await getCurrentCustomerInfo();
            setCurrentCustomer(customerNavBarName);
        };

        fetchData();
    }, []);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <button
                    className={`navbar-burger ${isExpanded ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded={isExpanded}
                    onClick={handleToggle}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>
            <div className={`navbar-menu ${isExpanded ? "is-active" : ""}`}>
                <div className="navbar-start">
                    {isExpanded && (
                        <>
                            <li className="navbar__locations">
                                <Link className="navbar-item" to="/profile">
                                    {currentCustomer?.user?.firstName}'s Profile
                                </Link>
                            </li>
                            <li className="navbar__locations">
                                <Link className="navbar-item" to="/policies">
                                    Policies
                                </Link>
                            </li>
                        </>
                    )}
                </div>
                <div className="navbar-end">
                    <li className="navbar__item navbar__logout">
                        <Link
                            className="navbar-item"
                            to=""
                            onClick={() => {
                                localStorage.removeItem("moneyHoneys_user");
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    );
};
