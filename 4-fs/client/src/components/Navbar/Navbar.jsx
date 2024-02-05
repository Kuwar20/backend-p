import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="links-left">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <ul className="links-right">
        <li>
          <NavLink to="/link1">Link 1</NavLink>
        </li>
        <li>
          <NavLink to="/link2">Link 2</NavLink>
        </li>
        <li>
          <NavLink to="/link3">Link 3</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
