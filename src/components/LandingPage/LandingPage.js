import { getCurrentUser } from "../../APIManager.js"

export const LandingPageGreeting = () => {

    const currentUser = getCurrentUser()
    const greeting = currentUser.firstName
    
    return <>Hi {greeting}!</>
}