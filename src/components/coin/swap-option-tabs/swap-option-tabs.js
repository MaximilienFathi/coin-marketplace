import React, { useState } from "react";
import { styled, Tab, Tabs } from "@mui/material";

import SwapOptionInput from "../swap-option-input/swap-option-input";

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
  },
});

//############################################################################

function SwapOptionTabs({ unit, values, setSlippage, setWarning }) {
  const [option, setOption] = useState(values[0]);

  const handleClick = (newOption) => {
    setOption(newOption);
    if (unit === "%") setSlippage(newOption);
  };

  return (
    <div className="swap-option-tabs-container">
      <Tabs
        value={values.includes(option) ? option : false}
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
        <StyledTab
          label={values[0]}
          value={values[0]}
          onClick={() => handleClick(values[0])}
        />
        <StyledTab
          label={values[1]}
          value={values[1]}
          onClick={() => handleClick(values[1])}
        />
        <StyledTab
          label={values[2]}
          value={values[2]}
          onClick={() => handleClick(values[2])}
        />
        <StyledTab
          label={values[3]}
          value={values[3]}
          onClick={() => handleClick(values[3])}
        />
      </Tabs>
      <SwapOptionInput
        option={option}
        setOption={setOption}
        setSlippage={setSlippage}
        values={values}
        unit={unit}
        setWarning={setWarning}
      ></SwapOptionInput>
    </div>
  );
}

export default SwapOptionTabs;
