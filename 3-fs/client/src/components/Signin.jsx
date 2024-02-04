import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, number);
        if (number.length !== 10 || isNaN(number)) {
            setError("Please enter a valid 10-digit number.");
            setSuccessMessage(""); // Clear success message if there was any
        } else {
            setError("");
            console.log("Name:", name);
            console.log("Number:", number);

            // Make a POST request to your API
            axios
                .post("http://localhost:3000/api/user/create", {
                    name: name,
                    number: number,
                })
                .then((response) => {
                    console.log("Success:", response.data);
                    setSuccessMessage("User created and saved successfully.");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setSuccessMessage(""); // Clear success message in case of an error
                });
        }
    };

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Number:
                    <input
                        type="number"
                        placeholder="Enter your number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </label>
                <br />
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signin;
