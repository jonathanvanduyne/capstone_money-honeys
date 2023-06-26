import { getCurrentUser } from "../../APIManager.js"
import { AdvisorViews } from "./AdvisorViews/AdvisorViews.js"
import { CustomerViews } from "./CustomerViews/CustomerViews.js"



export const ApplicationViews = () => {

	const currentUser = getCurrentUser()


	if (currentUser.staff) {
		return <AdvisorViews />
	}
	else {
		return <CustomerViews />
	}
}

