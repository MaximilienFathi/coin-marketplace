import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./search-bar";
import Dropdown from "./dropdown";
import "./search-box.css";
import { styled, Tab, Tabs } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

//========================================================
// CUSTOM STYLES
// const StyledTabs = styled(Tabs)({
//   textColor: "red",
//   indicatorColor: "pink",
// });
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
    // transition: "all 1s",
  },

  // border: "2px solid #fa58b6",
  // borderRadius: "11px",
  // backgroundColor: "rgba(255, 255, 255, 0.1)",

  /*color: inherit,*/
  // transition: "all 1s",
});
//========================================================

function SearchBox({ setSearch, setFavorites }) {
  const tabs = ["/coins", "/exchanges", "/favorites"];
  const [value, setValue] = useState(tabs.indexOf(window.location.pathname));

  const handleChange = (event, newValue) => {
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
      <div className="right-search-container">
        <Dropdown></Dropdown>
        <SearchBar handleChange={handleChange}></SearchBar>
      </div>
    </div>
  );
}

export default SearchBox;

// <div className="large-search-container">
//   <nav className="table-nav">
//     <ul className="table-nav-list">
//       <li>
//         <Link to="/coins" className="table-nav-link">
//           CRYPTOCURRENCIES
//         </Link>
//       </li>
//       <li>
//         <Link to="/Exchanges" className="table-nav-link">
//           EXCHANGES
//         </Link>
//       </li>
//       <li>
//         <Link to="/Favorites" className="table-nav-link">
//           FAVORITES
//         </Link>
//       </li>
//     </ul>
//   </nav>
//   <div className="small-search-container">
//     <Dropdown></Dropdown>
//     <SearchBar handleChange={handleChange}></SearchBar>
//   </div>
//   {/*<Outlet />*/}
// </div>
