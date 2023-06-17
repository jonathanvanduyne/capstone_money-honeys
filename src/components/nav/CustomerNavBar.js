import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { getCurrentCustomerInfo } from "../../APIManager.js"
import { useEffect, useState } from "react"

export const CustomerNavBar = () => {
    const navigate = useNavigate()
    const [currentCustomer, setCurrentCustomer] = useState([])

    useEffect(() => {
            
        const fetchData = async () => {

                const customerNavBarName = await getCurrentCustomerInfo()
                setCurrentCustomer(customerNavBarName)
            }
            
            fetchData()
        }, [])

    return (
        <ul className="navbar">
            <li className="navbar__locations">
                <Link className="navbar__link" to="/profile">{currentCustomer?.user?.firstName}'s Profile</Link>
            </li>
            <li className="navbar__locations">
                <Link className="navbar__link" to="/policies">Policies</Link>
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