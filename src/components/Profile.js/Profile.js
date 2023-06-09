import { getCurrentUser } from "../../APIManager.js"
import { AdvisorProfile } from "./AdvisorProfile.js"
import { CustomerProfile } from "./CustomerProfile.js"

export const Profile = () => {
    
    const currentUser = getCurrentUser()

    if (currentUser.staff) {
        return <AdvisorProfile/>
    }
    else {
        return <CustomerProfile/>
    }
}
