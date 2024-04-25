import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled, Tab, Tabs } from "@mui/material";

import SearchBar from "../search-bar";
import Dropdown from "../dropdown";
import "./table-settings.css";

//############################################################################

// CUSTOM STYLES
const StyledTab = styled(Tab)({
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "1.6rem",
  fontWeight: 600,
  width: "14rem",
  "&.Mui-selected": {
    color: "inherit",
    background: "linear-gradient(90deg, #b84dc3, #a620b4)",
    boxShadow: "inset 0 0 2px #000",
    borderRadius: 11,
  },
  "&.Mui-selected:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
  "&:hover": {
    color: "inherit",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 11,
  },
});

//############################################################################

function TableSettings() {
  const tabs = [
    `${process.env.PUBLIC_URL}/coins`,
    `${process.env.PUBLIC_URL}/exchanges`,
    `${process.env.PUBLIC_URL}/favorites`,
  ];

  // Prevent error if user adds a slash at the end of the URL.
  const [tabIndex, setTabIndex] = useState(() => {
    let pathname = window.location.pathname;
    if (pathname.endsWith("/"))
      pathname = pathname.substring(0, pathname.length - 1);
    return tabs.indexOf(pathname);
  });

  // Keep track of tab labels and related data.
  const labelsArray = [
    { label: "CURRENCIES", component: Link, to: tabs.at(0) },
    { label: "EXCHANGES", component: Link, to: tabs.at(1) },
    { label: "FAVORITES", component: Link, to: tabs.at(2) },
  ];

  // Update tabIndex state upon clicking on another table settings tab.
  function handleChange() {
    let pathname = window.location.pathname;
    if (pathname.endsWith("/"))
      pathname = pathname.substring(0, pathname.length - 1);
    setTabIndex(tabs.indexOf(pathname));
  }

  //############################################################################

  return (
    <div className="table-settings-container">
      <div className="left-table-settings">
        <Tabs
          value={tabIndex}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          onChange={handleChange}
        >
          {labelsArray.map(({ label, component, to }) => {
            return (
              <StyledTab
                key={label}
                label={label}
                component={component}
                to={to}
              />
            );
          })}
        </Tabs>
      </div>
      <div className="right-table-settings">
        <Dropdown />
        <SearchBar />
      </div>
    </div>
  );
}

export default TableSettings;
