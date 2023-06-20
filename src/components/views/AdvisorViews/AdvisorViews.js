import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPageGreeting } from "../../LandingPage/LandingPage.js";
import { AdvisorPolicyList } from "../../AdvisorPolicies/AdvisorPoliciesList.js";
import { AdvisorCustomerDetail } from "../../AdvisorPolicies/AdvisorCustomerDetail.js";
import { ProductList } from "../../Products/ProductList.js";
import { AddNewPolicy } from "../../AdvisorPolicies/AddNewPolicy.js";
import { AddNewProduct } from "../../Products/AddNewProduct.js";
import { UpdateAdvisorProfile } from "../../Profile/AdvisorProfile/AdvisorEditProfile.js";
import { Profile } from "../../Profile/Profile.js";
import "./AdvisorViews.css"

export const AdvisorViews = () => {
	return (
		<div className="advisor-view">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<div className="section--parent">
									<section className="section">
								<h1 className="title"><span className="span-1">Money</span> <span className="span-2">Honey</span></h1>
									</section>
									<section className="section">
										<h2 className="subtitle">
											Connecting With a Financial Advisor Has Never Been So Sweet
										</h2>
									</section>
									<section className="section">
										<h3 className="greeting">
											<LandingPageGreeting />
										</h3>
									</section>
							</div>

							<section className="outlet-section">
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
}