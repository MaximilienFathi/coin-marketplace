import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../swap-option-tabs/swap-option-tabs.css";

//############################################################################

// CUSTOM STYLES
const StyledBox = styled(Box)({ maxWidth: "9rem", paddingLeft: "1.2rem" });

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
  },
  "& .MuiInputBase-root, .MuiInputBase-root:hover": {
    backgroundColor: "rgba(73,94,116,0.7)",
    borderRadius: "11px",
    width: "100%",
    padding: "1rem 1.2rem",
    "& > fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-root.Mui-focused": {
    "& > fieldset": {
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiInputBase-input": { padding: 0 },
  "& .MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "rgb(255, 255, 255)",
  },
});

const InputPropsStyles = {
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  color: "inherit",
};

//############################################################################

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
          style: InputPropsStyles,
          type: "number",
        }}
      />
    </StyledBox>
  );
}

export default SwapOptionInput;
