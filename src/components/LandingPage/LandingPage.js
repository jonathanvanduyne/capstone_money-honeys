import { getCurrentUser } from "../../APIManager.js"
import "./LandingPage.css"

export const LandingPageGreeting = () => {

    const currentUser = getCurrentUser()
    const greeting = currentUser.firstName
    
    return <span className="landing-page-greeting">Hi {greeting}!</span>;

}