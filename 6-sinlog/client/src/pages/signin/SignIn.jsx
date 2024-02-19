import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !gender) {
      setError("All fields are required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    else {
      setError("");
    }
    try {
      const response = await fetch(`http://localhost:3000/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, gender }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setError("Error signing in please try again");
    }
  };

  return (
    <div className="register">
      <h1>Sign In</h1>
      {success ? (<div className="success">You have successfully signed in</div>) : (
        <form onSubmit={handleSubmit}>
          <label>
            Full Name: <span className="red">*</span>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email: <span className="red">*</span>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Gender: <span className="red">*</span>
            <select
              className="options"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Gender
              </option>
              {/* the value should match to gender schema in the database */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Password: <span className="red">*</span>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button>Submit</button>
          <div className="error">
            <p>{error}</p>
          </div>
        </form>
      )}
      <div className="navigate">
        <Link to='/login'>Login Here</Link>
      </div>
    </div>
  );
};

export default SignIn;
