import React from "react";
import { Link } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";

import "./header.css";

//############################################################################

// CUSTOM STYLES
const IconStyles = {
  border: "2px solid #fc9bd3",
  borderRadius: "11px",
  color: "#fc9bd3",
  width: "4rem",
  height: "auto",
};

//############################################################################

function Header() {
  return (
    <nav className="header-nav">
      <Link to={`${process.env.PUBLIC_URL}/`} className="brand-logo">
        <MemoryIcon sx={IconStyles}></MemoryIcon>
        <p>COIN marketplace</p>
      </Link>
      <ul className="header-nav-list">
        <li>
          <Link to={`${process.env.PUBLIC_URL}/`} className="header-nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link
            to={`${process.env.PUBLIC_URL}/coins`}
            className="header-nav-link"
          >
            Rankings
          </Link>
        </li>
        <li>
          <div className="header-btn-group">
            <button className="login-btn">Login</button>
            <button className="SignUp-btn">Sign Up</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
