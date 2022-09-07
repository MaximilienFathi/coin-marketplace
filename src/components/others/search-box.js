import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./search-bar";
import Dropdown from "./dropdown";
import "./search-box.css";
import { styled, Tab, Tabs } from "@mui/material";

//========================================================
// CUSTOM STYLES
const StyledTab = styled(Tab)({
  // color: "rgba(255, 255, 255, 0.4)",
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "1.6rem",
  fontWeight: 600,
  width: "14rem",
  "&.Mui-selected": {
    // color: "rgba(255, 255, 255, 0.8)",
    color: "inherit",
    // backgroundColor: "#a361ab",
    background: "linear-gradient(90deg, #b84dc3, #a620b4)",
    boxShadow: "inset 0 0 3px #000",
    borderRadius: 11,
  },
  "&.Mui-selected:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
  "&:hover": {
    // color: "rgba(255, 255, 255, 0.8)",
    color: "inherit",
    backgroundColor: "rgba(255,255,255,0.1)",
    // boxShadow: "inset 0 0 3px #000",
    borderRadius: 11,
    // transition: "all 0.5s",
  },
});
//========================================================

function SearchBox({ setSearch, setFavorites }) {
  const tabs = ["/coins", "/exchanges", "/favorites"];
  const [value, setValue] = useState(tabs.indexOf(window.location.pathname));

  const handleChange = (event) => {
    setSearch(event.target.value);
    setValue(tabs.indexOf(window.location.pathname));
  };

  return (
    <div className="search-container">
      <div className="left-search-container">
        <Tabs
          value={value}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          onChange={handleChange}
          // aria-label="icon label tabs example"
        >
          <StyledTab
            // icon={<PhoneIcon />}
            label="CURRENCIES"
            component={Link}
            to={tabs.at(0)}
          />
          <StyledTab
            // icon={<FavoriteIcon />}
            label="EXCHANGES"
            component={Link}
            to={tabs.at(1)}
          />
          <StyledTab
            // icon={<PersonPinIcon />}
            label="FAVORITES"
            component={Link}
            to={tabs.at(2)}
          />
        </Tabs>
      </div>
      {/*<div className="centre-search-container"></div>*/}
      <div className="right-search-container">
        <Dropdown></Dropdown>
        <SearchBar handleChange={handleChange}></SearchBar>
      </div>
      {/*<Outlet />*/}
    </div>
  );
}

export default SearchBox;
