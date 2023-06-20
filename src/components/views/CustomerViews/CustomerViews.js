import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPageGreeting } from "../../LandingPage/LandingPage.js";
import { CustomerPolicyList } from "../../CustomerPolicies/CustomerPoliciesList.js";
import { CustomerAdvisorDetail } from "../../CustomerPolicies/CustomerAdvisorDetail.js";
import { Profile } from "../../Profile/Profile.js";
import { UpdateCustomerProfile } from "../../Profile/CustomerProfile/CustomerEditProfile.js";
import { AddNewBeneficiary } from "../../Profile/CustomerProfile/CustomerAddBeneficiary.js";
import { CustomerEditBeneficiary } from "../../Profile/CustomerProfile/CustomerEditBeneficiary.js";

export const CustomerViews = () => {
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
