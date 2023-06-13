import { Outlet, Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../LandingPage/LandingPage.js"
import { Profile } from "../Profile.js/Profile.js"
import { UpdateAdvisorProfile } from "../Profile.js/AdvisorUpdateProfile.js"
import { AdvisorPolicies} from "../AdvisorPolicies/AdvisorPoliciesList.js"


export const AdvisorViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>💰🍯Money Honeys🍯💰</h1>
					<h2>Connecting with a financial advisor has never been so sweet</h2>

					<LandingPageGreeting />
					<Outlet />
				</>
			} />

			<Route path="profile" element={<Profile />} />
			
			<Route path="profile/UpdateAdvisorProfile" element={<UpdateAdvisorProfile />} />
			
			<Route path="/policies" element={<AdvisorPolicies />} />
			
			{/* <Route path="/policies:advisorId" element={<AdvisorPolicies />} /> */}

			

		</Routes>
	)
}