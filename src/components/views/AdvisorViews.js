import { Outlet, Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../LandingPage/LandingPage.js"
import { AdvisorProfile } from "../Profile.js/AdvisorProfile.js"

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

			<Route path="profile" element={<AdvisorProfile />} />

			

		</Routes>
	)
}