import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPageGreeting } from "../LandingPage/LandingPage.js";
import { Profile } from "../Profile/Profile.js";
import { UpdateAdvisorProfile } from "../Profile/AdvisorEditProfile.js";
import { AdvisorPolicyList } from "../AdvisorPolicies/AdvisorPoliciesList.js";
import { AdvisorCustomerDetail } from "../AdvisorPolicies/AdvisorCustomerDetail.js";
import { ProductList } from "../Products/ProductList.js";
import { AddNewPolicy } from "../AdvisorPolicies/AddNewPolicy.js";
import { AddNewProduct } from "../Products/AddNewProduct.js";
import "./Views.css";

export const AdvisorViews = () => {
	return (
		<div className="center-container">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<section className="hero is-primary center-content">
								<div className="container">
									<h1 className="title">Money Honey</h1>
									<h2 className="subtitle">
										Connecting With a Financial Advisor Has Never Been So Sweet
									</h2>
									<h3 className="greeting">
										<LandingPageGreeting />
									</h3>
								</div>
							</section>
							
							<section>
								<Outlet />
							</section>
						</>
					}
				/>

				<Route path="profile" element={<Profile />} />

				<Route
					path="profile/UpdateAdvisorProfile"
					element={<UpdateAdvisorProfile />}
				/>

				<Route path="/policies" element={<AdvisorPolicyList />} />

				<Route path=":customerId" element={<AdvisorCustomerDetail />} />

				<Route path="/AddNewPolicy" element={<AddNewPolicy />} />

				<Route path="/products" element={<ProductList />} />

				<Route path="/AddNewProduct" element={<AddNewProduct />} />
			</Routes>
		</div>
	);
};
