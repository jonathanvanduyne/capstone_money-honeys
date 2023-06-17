import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { getCurrentAdvisorInfo } from "../../APIManager.js"
import { useEffect, useState } from "react"

export const AdvisorNavBar = () => {
    const navigate = useNavigate()
    const [currentAdvisor, setCurrentAdvisor] = useState([])

    useEffect(() => {
            
        const fetchData = async () => {

                const advisorNavBarName = await getCurrentAdvisorInfo()
                setCurrentAdvisor(advisorNavBarName)
            }
            
            fetchData()
        }, [])

    return (
        <ul className="navbar">
            <li className="navbar__locations">
                <Link className="navbar__link" to="/profile">{currentAdvisor?.user?.firstName}'s Profile</Link>
            </li>
            <li className="navbar__locations">
                <Link className="navbar__link" to="/policies">Policies</Link>
            </li>
            <li className="navbar__locations">
                <Link className="navbar__link" to="/products">Products</Link>
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