import React from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./search-bar";
import Dropdown from "./dropdown";

function SearchBox({ setSearch, setFavorites }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchBox">
      <div className="buttonGroup">
        {" "}
        {"change to nav list"}
        <Link to="/coins">Cryptocurrencies</Link>
        <Link to="/Exchanges">Exchanges</Link>
        <Link to="/Favorites">Favorites</Link>
      </div>
      <Dropdown></Dropdown>
      <SearchBar handleChange={handleChange}></SearchBar>
      {/*<Outlet />*/}
    </div>
  );
}

export default SearchBox;
