// src/pages/Home.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { userName } = useContext(UserContext);
  const { email } = useContext(UserContext);

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl">Welcome, {userName}!</h1>
      <h2 className="text-xl">Email: {email}</h2>
    </div>
  );
};

export default Home;
