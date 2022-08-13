import React from "react";

function SearchBar({ handleChange }) {
  return (
    <div className="search-container">
      <form className="search-form">
        <input
          className="search-bar"
          onChange={handleChange}
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default SearchBar;
