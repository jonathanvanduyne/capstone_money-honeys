//Users
export const getAllUsers = async () => {
    const response = await fetch("http://localhost:8088/users");
    const users = await response.json();
    return users;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Advisors
export const getAllAdvisors = async () => {
    const response = await fetch("http://localhost:8088/advisors?_expand=user");
    const advisors = await response.json();
    return advisors;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Customers
export const getAllCustomers = async () => {
    const response = await fetch("http://localhost:8088/customers?_expand=user");
    const customers = await response.json();
    return customers;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Billing Frequency
export const getAllBillingFrequencies = async () => {
    const response = await fetch("http://localhost:8088/billingFrequencies");
    const billingFrequency = await response.json();
    return billingFrequency;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Products
export const getAllProducts = async () => {
    const response = await fetch("http://localhost:8088/products?_expand=productType&_expand=billingFrequency");
    const products = await response.json();
    return products;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ProductTypes
export const getAllProductsTypes = async () => {
    const response = await fetch("http://localhost:8088/productTypes");
    const productTypes = await response.json();
    return productTypes;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Policies
export const getAllPolicies = async () => {
    const response = await fetch("http://localhost:8088/policies?_expand=customer&_expand=advisor&_expand=product&_expand=duration");
    const policies = await response.json();
    return policies
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CurrentUser
export const getCurrentUser = () => {
    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);
    return moneyHoneyUserObject;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Current Advisor
export const getCurrentAdvisorInfo = async () => {
    const response = await fetch("http://localhost:8088/advisors?_expand=user");
    const advisors = await response.json();

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

    const currentAdvisor = advisors.find(
        (advisor) => advisor?.user?.id === moneyHoneyUserObject.id
    );
    return currentAdvisor;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Current Customer
export const getCurrentCustomerInfo = async () => {
    const response = await fetch("http://localhost:8088/customers?_expand=user");
    const customers = await response.json();

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

    const currentCustomer = customers.find(
        (customer) => customer?.user?.id === moneyHoneyUserObject.id
    );
    return currentCustomer;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Beneficiary List
export const getAllBeneficiaries = async () => {
    const response = await fetch("http://localhost:8088/beneficiaries");
    const beneficiaries = await response.json();
    return beneficiaries
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Customer Beneficiares
export const getCurrentCustomerBeneficiaries = async () => {
    const beneficiaryResponse = await fetch("http://localhost:8088/beneficiaryBridges?_expand=customer&_expand=beneficiary");
    const beneficiaries = await beneficiaryResponse.json();

    const customersResponse = await fetch("http://localhost:8088/customers?_expand=user");
    const customers = await customersResponse.json();

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

    const currentCustomer = customers.find(
        (customer) => customer?.user?.id === moneyHoneyUserObject.id
    );

    const CustomerBeneficiaries = beneficiaries.filter((beneficiary) => beneficiary?.customerId === currentCustomer.id)

    return CustomerBeneficiaries
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BeneficiaryType
export const getAllBeneficiaryTypes = async () => {
    const beneficiaryTypesResponse = await fetch("http://localhost:8088/beneficiaryTypes");
    const beneficiariesTypes = await beneficiaryTypesResponse.json();

    return beneficiariesTypes
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BeneficiaryBridge
export const getBeneficiaryBridges = async () => {
    const beneficiaryBridgesResponse = await fetch("http://localhost:8088/beneficiaryBridges");
    const beneficiariesBridges = await beneficiaryBridgesResponse.json();

    return beneficiariesBridges
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Edit Current Beneficiary
export const getBeneficiaryForEdit = async ({ beneficiaryId }) => {
    const beneficiaryResponse = await fetch(
        `http://localhost:8088/beneficiaryBridges/${beneficiaryId}?_expand=customer&_expand=beneficiary`
    );
    const beneficiary = await beneficiaryResponse.json();
    const answer = beneficiary.beneficiary
    return answer;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Edit Beneficiaries by CustomerID
export const getBeneficiaryBridgesByCustomerId = async (customerId) => {
    const beneficiaryResponse = await fetch(
        `http://localhost:8088/beneficiaryBridges?customerId=${customerId}&_expand=customer&_expand=beneficiary`
    );
    const beneficiaryBridges = await beneficiaryResponse.json();
    return beneficiaryBridges[0].beneficiary;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Duration List
export const getAllDurations = async () => {
    const durationsResponse = await fetch("http://localhost:8088/durations");
    const durationsArray = await durationsResponse.json();

    return durationsArray
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Investments
export const getAllInvestments = async () => {
    const investmentsResponse = await fetch("http://localhost:8088/investmentPolicies?_expand=duration&_expand=investmentDescription&_expand=stockSymbol&_expand=customer&_expand=advisor");
    const investmentsArray = await investmentsResponse.json();

    return investmentsArray
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Current Advisor Investments
export const getAdvisorInvestments = async () => {
    const investmentsResponse = await fetch("http://localhost:8088/investmentPolicies?_expand=duration&_expand=investmentDescription&_expand=stockSymbol&_expand=customer&_expand=advisor");
    const investmentsArray = await investmentsResponse.json();

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

    const filteredInvestments = investmentsArray.filter((investment) => investment?.advisor.userId === moneyHoneyUserObject.id)

    return filteredInvestments
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Current Customer Investments
export const getCustomerInvestments = async () => {
    const investmentsResponse = await fetch("http://localhost:8088/investmentPolicies?_expand=duration&_expand=investmentDescription&_expand=stockSymbol&_expand=customer&_expand=advisor");
    const investmentsArray = await investmentsResponse.json();

    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

    const filteredInvestments = investmentsArray.filter((investment) => investment?.customer?.userId === moneyHoneyUserObject.id)

    return filteredInvestments
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Investment Types
export const getAllInvestmentTypes = async () => {
const typeResponse = await fetch("http://localhost:8088/investmentDescriptions?_expand=investmentType&_expand=billingFrequency");
const investmentTypes = await typeResponse.json();
return investmentTypes
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Stock Symbols
export const getAllStockSymbols = async () => {
const symbolsResponse = await fetch("http://localhost:8088/stockSymbols");
const stockSymbols = await symbolsResponse.json();
return stockSymbols
};