import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="header">
                <h2 className="left"><Link to="/">Home</Link></h2>
                {/* this route has to be in the app.jsx first then here */}
                <div className="right">
                    <h2><Link to="/signin">Signin</Link></h2>
                    <h2><Link to="/search">Search</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Header;
