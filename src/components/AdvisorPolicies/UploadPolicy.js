import { useEffect, useRef, useState } from "react";
import "./AdvisorPolicy.css";


export const UploadWidget = ({ policyNumber, productId, startDate, term, customerId, advisorId, onSignedPolicyUpload }) => {
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
                `http://localhost:8088/policies/${policyNumber}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            customerId: customerId,
                            advisorId: advisorId,
                            productId: productId,
                            startDate: startDate,
                            durationId: term,
                            policyURL: urlAddress
                        }),
                }
            );

            onSignedPolicyUpload()
            
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
            Upload Signed Policy
        </button>
    );
};
