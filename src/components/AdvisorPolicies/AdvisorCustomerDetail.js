import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const AdvisorCustomerDetail = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return (
        <section className="advisor-customer-detail">
            <header className="advisor-customer-detail-header">
                <h3 className="advisor-customer-detail-header-text">
                    {customer?.user?.firstName} {customer?.user?.lastName}
                </h3>
            </header>
            <div className="advisor-customer-detail-info">
                <div>Email: {customer?.user?.email}</div>
                <div>Phone Number: {customer?.phoneNumber}</div>
                <div>Address: {customer?.address}</div>
            </div>
        </section>
    );
};