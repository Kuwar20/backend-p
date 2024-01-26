import React, { useState } from "react";

const PhoneOtpLogin = () => {

    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumber = () => {

    }

    return (
        <div>
            <form onSubmit={() => { }}>
                <input type="text" 
                value={phoneNumber}
                onChange={handlePhoneNumber}
                placeholder="Enter your phone number"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PhoneOtpLogin;
