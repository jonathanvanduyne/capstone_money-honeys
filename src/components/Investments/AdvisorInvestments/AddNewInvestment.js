import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBillingFrequencies, getAllCustomers, getAllDurations, getAllInvestmentTypes, getAllStockSymbols, getCurrentAdvisorInfo } from "../../../APIManager.js";
import "./AdvisorInvestments.css"

export const AddNewInvestment = () => {
    const [investmentPolicy, update] = useState({
        customerId: "",
        startDate: "",
        price: 0,
        stockSymbolId: "",
    });
    const [investmentTypes, setInvestmentTypes] = useState([]);
    const [billingFrequencies, setBillingFrequencies] = useState([]);
    const [durations, setDurations] = useState([])
    const [customers, setCustomers] = useState([])
    const [currentAdvisor, setCurrentAdvisor] = useState([])
    const [stockSymbols, setStockSymbols] = useState([])

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            const allCustomers = await getAllCustomers()
            setCustomers(allCustomers)

            const advisor = await getCurrentAdvisorInfo()
            setCurrentAdvisor(advisor)

            const terms = await getAllDurations()
            setDurations(terms)

            const types = await getAllInvestmentTypes()
            setInvestmentTypes(types)

            const frequencies = await getAllBillingFrequencies()
            setBillingFrequencies(frequencies)

            const symbols = await getAllStockSymbols()
            setStockSymbols(symbols)
        };

        fetchData();
    }, []);


    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        const investmentPolicyToSendToAPI = {
            customerId: investmentPolicy.customerId,
            advisorId: currentAdvisor.id,
            investmentDescriptionId: 1,
            durationId: 2,
            startDate: investmentPolicy.startDate,
            price: investmentPolicy.price,
            stockSymbolId: investmentPolicy.stockSymbolId,
        };

        const response = await fetch("http://localhost:8088/investmentPolicies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(investmentPolicyToSendToAPI),
        });
        await response.json();
        return navigate("/investments");
    };

    return (
        <form className="add-new-investment-form">
            <h2 className="add-new-investment-form-title">Add New Investment</h2>

            <fieldset>
                <div className="add-new-investment-form-group">
                    <label htmlFor="customer">Customer:</label>
                    <select
                        className="add-new-investment-form-select"
                        value={investmentPolicy.customerId}
                        onChange={(evt) => {
                            const copy = { ...investmentPolicy };
                            copy.customerId = parseFloat(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select a Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer?.user.firstName} {customer?.user?.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="add-new-investment-form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        required
                        type="date"
                        placeholder="Policy Start Date"
                        className="add-new-investment-form-input"
                        value={investmentPolicy.startDate}
                        onChange={(evt) => {
                            const copy = { ...investmentPolicy };
                            copy.startDate = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="add-new-investment-form-group">
                    <label htmlFor="Duration">Stock:</label>
                    <select
                        className="add-new-investment-form-select"
                        value={investmentPolicy.stockSymbolId}
                        onChange={(evt) => {
                            const copy = { ...investmentPolicy };
                            copy.stockSymbolId = parseInt(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option value="">Select a Stock</option>
                        {stockSymbols.map((symbol) => (
                            <option key={symbol.id} value={symbol.id}>
                                {symbol?.companyName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="add-new-investment-form-group">
                    <label htmlFor="Price">Price:</label>
                    <input
                        required
                        autoFocus
                        type="number"
                        className="add-new-investment-form-input"
                        placeholder="Initial Investment Price Here"
                        value={investmentPolicy.price}
                        onChange={(evt) => {
                            const copy = { ...investmentPolicy };
                            copy.price = parseFloat(evt.target.value);
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="add-new-investment-form-button"
            >
                Submit New Investment Policy
            </button>
        </form>
    );
}      