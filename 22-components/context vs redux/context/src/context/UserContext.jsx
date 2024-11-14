// src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('kuwarx1@gmail.com');

  return (
    <UserContext.Provider value={{ userName, setUserName , email, setEmail}}>
      {children}
    </UserContext.Provider>
  );
};
