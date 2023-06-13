import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const AdvisorCustomerDetail = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return (
        <section className="customer">
            <header className="customer__header">
                <h3>{customer?.user?.firstName} {customer?.user?.lastName}</h3>
            </header>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone Number: {customer?.phoneNumber}</div>
            <div>Address: {customer?.address}</div>
        </section>
    )
}      