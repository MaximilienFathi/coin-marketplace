import React from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./search-bar";
import Dropdown from "./dropdown";
import "./search-box.css";

function SearchBox({ setSearch, setFavorites }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="large-search-container">
      <nav className="table-nav">
        <ul className="table-nav-list">
          <li>
            <Link to="/coins" className="table-nav-link">
              Cryptocurrencies
            </Link>
          </li>
          <li>
            <Link to="/Exchanges" className="header-nav-link">
              Exchanges
            </Link>
          </li>
          <li>
            <Link to="/Favorites" className="header-nav-link">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
      <div className="small-search-container">
        <Dropdown></Dropdown>
        <SearchBar handleChange={handleChange}></SearchBar>
      </div>
      {/*<Outlet />*/}
    </div>
  );
}

export default SearchBox;
