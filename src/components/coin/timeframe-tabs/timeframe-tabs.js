import React, { useState } from "react";
import { styled, Tab, Tabs } from "@mui/material";

import "./timeframe-tabs.css";

//############################################################################

// CUSTOM STYLES
const StyledTab = styled(Tab)({
  color: "rgba(255, 255, 255, 0.6)",
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  minWidth: "5rem",
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
    color: "inherit",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 11,
    // transition: "all 0.5s",
  },
});

//############################################################################

export default function TimeframeTabs({ fetchChartData, datatype }) {
  const [value, setValue] = useState("1");

  // Keep track of labels and related value
  const labelsArray = [
    { label: "1D", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
    { label: "1Y", value: "365" },
    { label: "All", value: "max" },
  ];

  function handleClick(newTimeframe) {
    setValue(newTimeframe);
    fetchChartData(datatype, newTimeframe);
  }

  //############################################################################

  return (
    <div className="timeframe-tabs-container">
      <Tabs
        value={value}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        sx={{ "&.MuiTabs-root": { minHeight: "fit-content" } }}
      >
        {labelsArray.map(({ label, value }) => {
          return (
            <StyledTab
              key={label}
              label={label}
              value={value}
              onClick={() => handleClick(value)}
            />
          );
        })}
      </Tabs>
      {/*<Outlet />*/}
    </div>
  );
}
