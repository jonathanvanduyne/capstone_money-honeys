import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdvisorInvestmentsList = () => {

    const [allInvestments, setAllInvestments] = useState([]);
    const [currentAdvisor, setCurrentAdvisor] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [currentAdvisorInvestments, setCurrentAdvisorInvestments] = useState([]);
    const navigate = useNavigate();



    return <></>
}