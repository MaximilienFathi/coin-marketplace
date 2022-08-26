import React from "react";
import { Link } from "react-router-dom"; // check link
import Button from "./button";
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
          <Button label="Login"></Button>
        </li>
        <li>
          <Button label="Sign Up"></Button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
