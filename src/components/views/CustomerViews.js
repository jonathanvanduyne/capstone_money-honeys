import { Outlet, Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../LandingPage/LandingPage.js"
import { Profile } from "../Profile.js/Profile.js"
import { UpdateCustomerProfile } from "../Profile.js/CustomerEditProfile.js"
import { CustomerPolicyList } from "../CustomerPolicies/CustomerPoliciesList.js"
import { CustomerAdvisorDetail } from "../CustomerPolicies/CustomerAdvisorDetail.js"
import { AddNewBeneficiary } from "../Profile.js/CustomerAddBeneficiary.js"
import { CustomerEditBeneficiary} from "../Profile.js/CustomerEditBeneficiary.js"


export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>💰🍯Money Honey🍯💰</h1>
					<h2>Connecting With a Financial Advisor Has Never Been So Sweet</h2>

					<LandingPageGreeting />
					<Outlet />
				</>
			} />

			<Route path="profile" element={<Profile />} />

			<Route path="profile/UpdateCustomerProfile" element={<UpdateCustomerProfile />} />

			<Route path="policies" element={<CustomerPolicyList />} />

			<Route path=":advisorId" element={<CustomerAdvisorDetail />} />
			
			<Route path="addNewBeneficiary" element={<AddNewBeneficiary />} />
			
			<Route path="profile/editBeneficiary/:beneficiaryId" element={<CustomerEditBeneficiary />} />

		</Routes>
	)
}