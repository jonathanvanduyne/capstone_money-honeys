import { useEffect, useRef, useState } from "react";

export const UploadInvestmentWidget = ({ investmentId, customer, advisor, investmentDescription, duration, startDate, price, stockSymbol, fetchData }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [uploadedUrl, setUploadedUrl] = useState(null);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dbiwrnyu2",
                uploadPreset: "moneyHoneyUpload",
            },
            function (error, result) {
                if (!error && result && result.event === "success") {
                    const UrlAddress = result.info.secure_url;
                    setUploadedUrl(UrlAddress);
                }
            }
        );
    }, []);

    useEffect(() => {
        if (uploadedUrl) {
            updatePolicyUrl(uploadedUrl);
        }
    }, [uploadedUrl]);

    const updatePolicyUrl = async (urlAddress) => {
        try {
            const response = await fetch(
                `http://localhost:8088/investmentPolicies/${investmentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            customerId: customer,
                            advisorId: advisor,
                            investmentDescriptionId: investmentDescription,
                            durationId: duration,
                            startDate: startDate,
                            price: price,
                            stockSymbolId: stockSymbol,
                            documentationURL: urlAddress
                        }),
                }
            );

            fetchData()

            if (!response.ok) {
                throw new Error("Failed to update policy URL");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <button
            className="upload-policy-button"
            onClick={() => widgetRef.current.open()}
        >
            Upload Investment Documentation
        </button>
    );
};
