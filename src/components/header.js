import React, { useState } from "react";
import SearchBar from "./search-bar";
import Button from "./button";

function Header() {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <a className="brand-logo" href="#">
        COIN marketplace
      </a>
      <SearchBar handleChange={handleChange}></SearchBar>
      <Button label="Login"></Button>
      <Button label="Sign Up"></Button>
    </div>
  );
}

export default Header;
