import React, { useState } from "react";
import { styled, Tab, Tabs } from "@mui/material";
import "./coin-data-tabs.css";

//========================================================
// CUSTOM STYLES
const StyledTab = styled(Tab)({
  // color: "rgba(255, 255, 255, 0.4)",
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  width: "13rem",
  // "&.MuiButtonBase-root": { padding: 2, height: 20 },
  "&.Mui-selected": {
    // color: "rgba(255, 255, 255, 0.8)",
    color: "inherit",
    // backgroundColor: "#a361ab",
    background: "linear-gradient(90deg, #b84dc3, #a620b4)",
    boxShadow: "inset 0 0 2px #000",
    borderRadius: 50,
  },
  "&.Mui-selected:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
  "&:hover": {
    // color: "rgba(255, 255, 255, 0.8)",
    color: "inherit",
    backgroundColor: "rgba(255,255,255,0.1)",
    // boxShadow: "inset 0 0 3px #000",
    borderRadius: 50,
    // transition: "all 0.5s",
  },
});
//========================================================

function CoinDataTabs({ fetchData, datatype, timeframe }) {
  const tabs = ["prices", "market_caps", "total_volumes"];
  const [value, setValue] = useState("prices");

  const handleClick = (newDatatype) => {
    console.log("result is ", datatype);
    setValue(newDatatype);
    fetchData(newDatatype, timeframe);
  };

  return (
    <div className="tabs-container">
      <Tabs
        value={value}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        // onChange={handleChange}
        // aria-label="icon label tabs example"
      >
        <StyledTab
          label="Price"
          value="prices"
          onClick={() => handleClick("prices")}
        />
        <StyledTab
          label="Market Cap"
          value="market_caps"
          onClick={() => handleClick("market_caps")}
        />
        <StyledTab
          label="Total Volume"
          value="total_volumes"
          onClick={() => handleClick("total_volumes")}
        />
      </Tabs>
      {/*<Outlet />*/}
    </div>
  );
}

export default CoinDataTabs;
