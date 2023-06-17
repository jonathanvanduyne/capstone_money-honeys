import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPageGreeting } from "../LandingPage/LandingPage.js";
import { Profile } from "../Profile/Profile.js";
import { UpdateCustomerProfile } from "../Profile/CustomerEditProfile.js";
import { CustomerPolicyList } from "../CustomerPolicies/CustomerPoliciesList.js";
import { CustomerAdvisorDetail } from "../CustomerPolicies/CustomerAdvisorDetail.js";
import { AddNewBeneficiary } from "../Profile/CustomerAddBeneficiary.js";
import { CustomerEditBeneficiary } from "../Profile/CustomerEditBeneficiary.js";
import "./Views.css";

export const CustomerViews = () => {
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

				<Route path="profile/UpdateCustomerProfile" element={<UpdateCustomerProfile />}
				/>

				<Route path="policies" element={<CustomerPolicyList />} />

				<Route path=":advisorId" element={<CustomerAdvisorDetail />} />

				<Route path="addNewBeneficiary" element={<AddNewBeneficiary />} />

				<Route path="profile/editBeneficiary/:beneficiaryId" element={<CustomerEditBeneficiary />}
				/>
			</Routes>
		</div>
	);
};
