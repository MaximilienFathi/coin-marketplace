import React from "react";
import Button from "./button";
import SearchBar from "./search-bar";

function SearchBox({ setSearch }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchBox">
      <div className="buttonGroup">
        <Button label="Cryptocurrencies"></Button>
        <Button label="Exchanges"></Button>
        <Button label="Favorites"></Button>
        {/*<Button label="USD"></Button>*/}
      </div>
      <SearchBar handleChange={handleChange}></SearchBar>
    </div>
  );
}

export default SearchBox;