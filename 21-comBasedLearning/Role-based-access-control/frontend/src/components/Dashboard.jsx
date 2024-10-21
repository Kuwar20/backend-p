import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-lg mb-4">{message}</p>
        <p className="text-sm mb-2 text-gray-600">Role: <span className="font-medium">{user.role}</span></p>
        {user.role === 'admin' && (
          <p className="text-sm text-green-600 font-semibold">You have admin privileges!</p>
        )}
        <button 
          onClick={logout} 
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="mt-8">
        <Link 
          to="/ssp" 
          className="text-blue-500 hover:underline text-lg font-semibold"
        >
          Go to Search Sort Pagination
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
