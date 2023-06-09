//Users
export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(users => users)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Advisors
export const getAllAdvisors = () => {
    return fetch("http://localhost:8088/advisors")
        .then(res => res.json())
        .then(advisors => advisors)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Customers
export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
        .then(customers => customers)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Products
export const getAllProducts = () => {
    return fetch("http://localhost:8088/products")
        .then(res => res.json())
        .then(products => products)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ProductTypes
export const getAllProductsTypes = () => {
    return fetch("http://localhost:8088/productsTypes")
        .then(res => res.json())
        .then(productTypes => productTypes)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Policies
export const getAllPolicies = () => {
    return fetch("http://localhost:8088/policies")
        .then(res => res.json())
        .then(policies => policies)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CurrentUser
export const getCurrentUser = () => {
    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user")
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser)

    return moneyHoneyUserObject
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Current Advisor
export const getCurrentAdvisorInfo = () => {
    return fetch("http://localhost:8088/advisors?_expand=user")
        .then(res => res.json())
        .then(advisors => {
            const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
            const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

            const currentAdvisor = advisors.find(advisor => advisor?.user?.id === moneyHoneyUserObject.id);

            return currentAdvisor;
        });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Current Customer
export const getCurrentCustomerInfo = () => {
    return fetch("http://localhost:8088/customers?_expand=user")
        .then(res => res.json())
        .then(customers => {
            const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user");
            const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser);

            const currentCustomer = customers.find(customer => customer?.user?.id === moneyHoneyUserObject.id);

            return currentCustomer;
        });
}
