import { Outlet, Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../LandingPage/LandingPage.js"
import { Profile } from "../Profile/Profile.js"
import { UpdateAdvisorProfile } from "../Profile/AdvisorEditProfile.js"
import { AdvisorPolicyList} from "../AdvisorPolicies/AdvisorPoliciesList.js"
import { AdvisorCustomerDetail} from "../AdvisorPolicies/AdvisorCustomerDetail.js"
import { ProductList } from "../Products/ProductList.js"
import { AddNewPolicy } from "../AdvisorPolicies/AddNewPolicy.js"
import { AddNewProduct } from "../Products/AddNewProduct.js"


export const AdvisorViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>💰Money Honey🍯</h1>
					<h2>Connecting With a Financial Advisor Has Never Been So Sweet</h2>

					<LandingPageGreeting />
					<Outlet />
				</>
			} />

			<Route path="profile" element={<Profile />} />
			
			<Route path="profile/UpdateAdvisorProfile" element={<UpdateAdvisorProfile />} />
			
			<Route path="/policies" element={<AdvisorPolicyList />} />
			
			<Route path=":customerId" element={<AdvisorCustomerDetail />} />
			
			<Route path="/AddNewPolicy" element={<AddNewPolicy />} />
			
			<Route path="/products" element={<ProductList />} />
			
			<Route path="/AddNewProduct" element={<AddNewProduct />} />

			

		</Routes>
	)
}