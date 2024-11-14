// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <div className="p-10">
        <Home />
        <Profile />
      </div>
    </UserProvider>
  );
};

export default App;
