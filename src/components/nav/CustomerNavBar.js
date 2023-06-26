import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { getCurrentCustomerInfo } from "../../APIManager.js";
import { useEffect, useRef, useState } from "react";

export const CustomerNavBar = () => {
    const navigate = useNavigate();
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const expandTimeoutRef = useRef(null);

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

    const handleMouseEnter = () => {
        clearTimeout(expandTimeoutRef.current);
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        expandTimeoutRef.current = setTimeout(() => {
            setIsExpanded(false);
        }, 50);
    };

    const handleLinkClick = () => {
        setIsExpanded(false);
    };

    return (
        <div
            className={`navbar__container ${isExpanded ? "expanded" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`navbar__icon ${isExpanded ? "active" : ""}`}
                onClick={handleToggle}
            >
                <span className="navbar__icon-bar"></span>
                <span className="navbar__icon-bar"></span>
                <span className="navbar__icon-bar"></span>
            </div>
            {isExpanded ? (
                <ul>
                    <li className="navbar__locations">
                        <Link
                            className="navbar__link"
                            to="/profile"
                            onClick={handleLinkClick}
                        >
                            {currentCustomer?.user?.firstName}'s Profile
                        </Link>
                    </li>
                    <li className="navbar__locations">
                        <Link
                            className="navbar__link"
                            to="/policies"
                            onClick={handleLinkClick}
                        >
                            Policies
                        </Link>
                    </li>
                    <li className="navbar__locations">
                        <Link
                            className="navbar__link"
                            to="/investments"
                            onClick={handleLinkClick}
                        >
                            Investments
                        </Link>
                    </li>
                    <li className="navbar__locations">
                        <Link
                            className="navbar__link"
                            to=""
                            onClick={() => {
                                localStorage.removeItem("moneyHoneys_user");
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};
