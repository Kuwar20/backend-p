// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';


const App = () => {
  return (
      <div className="p-10">
        <Home />
        <Profile />
      </div>
  );
};

export default App;
