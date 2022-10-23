import React, { useState } from "react";
import { styled, Tab, Tabs } from "@mui/material";
import CalculatorInput from "./calculator-input/calculator-input";
import SwapOptionInput from "./swap-option-input";

//========================================================
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
//========================================================

function SwapOptionTabs() {
  const [slippage, setSlippage] = useState(0.1);

  const handleClick = (newSlippage) => {
    setSlippage(newSlippage);
  };

  return (
    <div className="swap-option-tabs-container">
      <Tabs
        value={slippage}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        sx={{
          "&.MuiTabs-root": {
            minHeight: "fit-content",
            paddingRight: "1.2rem",
            borderRight: "2px solid rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <StyledTab label="0.1" value={0.1} onClick={() => handleClick(0.1)} />
        <StyledTab label="0.5" value={0.5} onClick={() => handleClick(0.5)} />
        <StyledTab label="1.0" value={1.0} onClick={() => handleClick(1.0)} />
        <StyledTab label="2.0" value={2.0} onClick={() => handleClick(2.0)} />
      </Tabs>
      <SwapOptionInput
        slippage={slippage}
        setSlippage={setSlippage}
      ></SwapOptionInput>
      {/*<Outlet />*/}
    </div>
  );
}

export default SwapOptionTabs;
