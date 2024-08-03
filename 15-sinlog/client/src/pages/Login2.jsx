import React, { useState } from "react";

const Login1 = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(name, password);
    const response = await fetch(
      `https://666fc0fe0900b5f872481dcc.mockapi.io/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      },
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    }
  };

  return (
    <div>
      <h1 className="text-center text-bold">Login page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <h2>Name</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            required
            autoComplete=""
            value={name}
            onChange={function (e) {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          // onChange={(e) => {
          //   setName(e.target.value);
          //   console.log(e.target.value);
          // }}
          />
        </div>
        <div>
          <h2>Password</h2>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="bg-green-500 p-2 rounded-md mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login1;
