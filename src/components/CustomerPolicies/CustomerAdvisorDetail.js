import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerAdvisorDetail = () => {
    const { advisorId } = useParams()
    const [advisor, updateAdvisor] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/advisors?_expand=user&id=${advisorId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleAdvisor = data[0]
                    updateAdvisor(singleAdvisor)
                })
        },
        [advisorId]
    )

    return (
        <section className="customer-advisor">
            <header className="customer-advisor__header">
                <h3>{advisor?.user?.firstName} {advisor?.user?.lastName}</h3>
            </header>
            <div>Email: {advisor?.user?.email}</div>
            <div>Phone Number: {advisor?.officePhone}</div>
            <div>Address: {advisor?.officeAddress}</div>
        </section>
    );
};