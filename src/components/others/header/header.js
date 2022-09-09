import React from "react";
import { Link } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import "./header.css";

//========================================================
// CUSTOM STYLES
const IconStyles = {
  border: "2px solid #fc9bd3",
  borderRadius: "11px",
  color: "#fc9bd3",
  // boxShadow: "0 0 1rem 0.05rem #b8b8b8",
  width: "4rem",
  height: "auto",
};
//========================================================

function Header() {
  return (
    <nav className="header-nav">
      <Link to="/" className="brand-logo">
        <MemoryIcon sx={IconStyles}></MemoryIcon>
        <p>COIN marketplace</p>
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
