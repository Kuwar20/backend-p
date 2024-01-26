import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handlePhoneNumber = (event) => {
        // this will let us type in the input field
        setPhoneNumber(event.target.value);
    };

    const handlePhoneSubmit = (event) => {
        // this will prevent the default submit behaviour
        event.preventDefault();

        //phone number validation
        const regex = /^[0-9]{10}$/;
        if (phoneNumber.length < 10 || !regex.test(phoneNumber)) {
            alert("Please enter a valid phone number");
            return;
        }
        //call the API to send the OTP
        setShowOtpInput(true);
    };

    const onOtpSubmit = (otp) => {
        console.log("Login Successfull", otp);
    };

    return (
        <div>
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="Enter your phone number"
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>Enter Otp sent to {phoneNumber}</p>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    );
};

export default PhoneOtpLogin;
