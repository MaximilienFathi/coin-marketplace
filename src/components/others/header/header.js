import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <nav className="header-nav">
      <Link to="/" className="brand-logo">
        COIN marketplace
      </Link>
      <ul className="header-nav-list">
        <li>
          <Link to="/" className="header-nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/coins" className="header-nav-link">
            Rankings
          </Link>
        </li>
        <li>
          <div className="header-btn-group">
            <button className="loginBtn">Login</button>
            <button className="SignUpBtn">Sign Up</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
