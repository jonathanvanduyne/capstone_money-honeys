import "./NavBar.css"
import { CustomerNavBar } from "./CustomerNavBar.js"
import { AdvisorNavBar } from "./AdvisorNavBar.js"

export const NavBar = () => {

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user")
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser)

    if (moneyHoneyUserObject.staff) {
        return <AdvisorNavBar />
    }
    else {
        return <CustomerNavBar />
    }
}



