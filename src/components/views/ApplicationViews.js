import { AdvisorViews } from "./AdvisorViews.js"
import { CustomerViews } from "./CustomerViews.js"


export const ApplicationViews = () => {

	const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user")
	const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser)


	if (moneyHoneyUserObject.staff) {
		return <AdvisorViews />
	}
	else {
		return <CustomerViews />
	}
}

