import React, { useState } from "react";
import { styled, Tab, Tabs } from "@mui/material";
import "./coin-data-tabs.css";

//========================================================
// CUSTOM STYLES
const StyledTab = styled(Tab)({
  color: "rgba(255, 255, 255, 0.6)",
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  minWidth: "13rem",
  "&.MuiButtonBase-root": { padding: 10, minHeight: 30 },
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
    // color: "rgba(255, 255, 255, 0.8)",
    color: "inherit",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 11,
    // transition: "all 0.5s",
  },
});
//========================================================

function CoinDataTabs({ fetchChartData, timeframe }) {
  const [value, setValue] = useState("prices");

  const handleClick = (newDatatype) => {
    setValue(newDatatype);
    fetchChartData(newDatatype, timeframe);
  };

  return (
    <div className="coin-data-tabs-container">
      <Tabs
        value={value}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        sx={{ "&.MuiTabs-root": { minHeight: "fit-content" } }}
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
