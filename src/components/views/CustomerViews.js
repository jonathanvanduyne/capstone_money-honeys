import { Outlet, Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../LandingPage/LandingPage.js"
import { Profile } from "../Profile.js/Profile.js"
import { UpdateCustomerProfile } from "../Profile.js/CustomerUpdateProfile.js"
import { CustomerPolicyList } from "../CustomerPolicies/CustomerPoliciesList.js"
import { CustomerAdvisorDetail } from "../CustomerPolicies/CustomerAdvisorDetail.js"


export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>💰🍯Money Honey🍯💰</h1>
					<h2>Connecting with a financial advisor has never been so sweet</h2>

					<LandingPageGreeting />
					<Outlet />
				</>
			} />

			<Route path="profile" element={<Profile />} />

			<Route path="profile/UpdateCustomerProfile" element={<UpdateCustomerProfile />} />

			<Route path="policies" element={<CustomerPolicyList />} />

			<Route path=":advisorId" element={<CustomerAdvisorDetail />} />

		</Routes>
	)
}