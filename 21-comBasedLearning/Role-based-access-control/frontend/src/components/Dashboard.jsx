// client/src/components/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        const data = await response.json();
        setMessage(data.msg);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <p>Role: {user.role}</p>
      {user.role === 'admin' && <p>You have admin privileges!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;