import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../swap-option-tabs/swap-option-tabs.css";
import { useEffect, useState } from "react";

//========================================================
// CUSTOM STYLES
const StyledBox = styled(Box)({ maxWidth: "7rem", paddingLeft: "1.2rem" });

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
  },
  "& .MuiInputBase-root, .MuiInputBase-root:hover": {
    backgroundColor: "#495e74",
    borderRadius: "11px",
    width: "100%",
    padding: "1rem",
    "& > fieldset": {
      // border: "2px solid #b84dc3",
      border: "none",
    },
  },
  "& .MuiInputBase-root.Mui-focused": {
    "& > fieldset": {
      // transition: "all 0.3s",
      // border: "none",
      // boxShadow: "0 0 0.5rem 0.2rem #b84dc3",
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiInputBase-input": { padding: 0 },
  "& .MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "rgb(255, 255, 255)", // rgba(255, 255, 255, 0.8)
  },
  // "& .MuiInputBase-input": { height: 24, paddingBottom: 12, paddingTop: 12 },
});

const InputPropsStyles = {
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  color: "inherit", // rgba(255, 255, 255, 0.8)

  // color: "rgba(255, 255, 255, 0.6)",
};
//========================================================

// const displayPlaceholder = () => {
//   if (!option) return "";
//   if (unit === "%")
//     return option.toLocaleString("en-US", {
//       minimumFractionDigits: 1,
//     });
//   if (unit === "min") return String(option);
// };

function SwapOptionInput({ option, setOption, setSlippage, unit, setWarning }) {
  const handleChange = (event) => {
    if (event.target.value === "") {
      setOption("");
      if (unit === "%") setSlippage("");
      return;
    }
    const input = Number(event.target.value);
    setOption(input);
    if (unit === "%") {
      setSlippage(input);
      if (input > 5) setWarning("Your transaction may be frontrun");
      if (input <= 5) setWarning("");
    }
  };

  return (
    <StyledBox>
      <StyledTextField
        onChange={(event) => {
          handleChange(event);
        }}
        value={option}
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          // placeholder: displayPlaceholder(),
          style: InputPropsStyles,
          type: "number",
        }}
      />
    </StyledBox>
  );
}

export default SwapOptionInput;
