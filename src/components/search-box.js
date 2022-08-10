import React from "react";
import Button from "./button";
import SearchBar from "./search-bar";
import { Link, Outlet } from "react-router-dom";

function SearchBox({ setSearch, setFavorites }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = () => setFavorites(localStorage);

  return (
    <div className="searchBox">
      <div className="buttonGroup">
        {/*<Button label="Cryptocurrencies"></Button>*/}
        {/*<Button label="Exchanges"></Button>*/}
        {/*<Button label="Favorites" handleClick={handleClick}></Button>*/}
        <Link to="/coins">Cryptocurrencies</Link>
        {/*<Button label="USD"></Button>*/}
      </div>
      <SearchBar handleChange={handleChange}></SearchBar>
      {/*<Outlet />*/}
    </div>
  );
}

export default SearchBox;
