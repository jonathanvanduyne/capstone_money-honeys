import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdvisorNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__locations">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("moneyHoneys_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}