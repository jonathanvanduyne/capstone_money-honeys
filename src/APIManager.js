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
//Products
export const getAllProducts = async () => {
    const response = await fetch("http://localhost:8088/products");
    const products = await response.json();
    return products;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ProductTypes
export const getAllProductsTypes = async () => {
    const response = await fetch("http://localhost:8088/productsTypes");
    const productTypes = await response.json();
    return productTypes;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Policies
export const getAllPolicies = async () => {
    const response = await fetch("http://localhost:8088/policies?_expand=customer&_expand=advisor&_expand=product");
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
//Delete Button for Advisors' Policy Page
export const AdvisorDeleteButton = ({ policyId }) => {

    const handleClick = () => {
        fetch(`http://localhost:8088/policies/${policyId}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllPolicies();
            });
    };

    return (
        <button onClick={handleClick} className="policy__delete">
            Delete
        </button>
    );
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
