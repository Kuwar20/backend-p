import React from 'react';

const Navbar = ({ links }) => {
  // output the links in console
  console.log(links);
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div>
        {/* Add user profile or notifications here */}
        <ul className="flex space-x-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
