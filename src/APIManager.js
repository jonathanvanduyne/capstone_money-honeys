export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getAllAdvisors = () => {
    return fetch("http://localhost:8088/advisors")
        .then(res => res.json())
}

export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}

export const getAllProducts = () => {
    return fetch("http://localhost:8088/products")
        .then(res => res.json())
}

export const getAllProductsTypes = () => {
    return fetch("http://localhost:8088/productsTypes")
        .then(res => res.json())
}

export const getAllPolicies = () => {
    return fetch("http://localhost:8088/policies")
        .then(res => res.json())
}

export const getCurrentUser = () => {
    const localmoneyHoneyUser = localStorage.getItem("moneyHoneys_user")
    const moneyHoneyUserObject = JSON.parse(localmoneyHoneyUser)

    return moneyHoneyUserObject
}
