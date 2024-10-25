import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div>
        {/* Add user profile or notifications here */}
      </div>
    </div>
  );
};

export default Navbar;
