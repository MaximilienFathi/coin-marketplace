import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//========================================================
// CUSTOM STYLES
const StyledBox = styled(Box)({ maxWidth: "50rem" });

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
  },
  "& .MuiInputBase-root, .MuiInputBase-root:hover": {
    backgroundColor: "rgba(73,94,116,0.5)",
    borderRadius: "11px",
    width: "100%",
    "& > fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-root.Mui-focused": {
    "& > fieldset": {
      // transition: "all 0.3s",
      // boxShadow: "0 0 0.5rem 0.2rem #b84dc3",
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "1.8rem",
    fontWeight: 500,
    color: "rgb(255, 255, 255)", // rgba(255, 255, 255, 0.8)
  },
  "& .MuiInputBase-input": { height: 26, paddingBottom: 13, paddingTop: 13 },
});

const InputPropsStyles = {
  fontFamily: "inherit",
  fontSize: "1.8rem",
  fontWeight: 600,
  color: "inherit", // rgba(255, 255, 255, 0.8)
};

const InputAdornmentStyles = {
  width: "fit-content",
  height: "1.5rem",
  padding: "1rem",
  marginRight: "1.2rem",
  borderRadius: "11px",
  // background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
  justifyContent: "center",
};
//========================================================

function ConverterInput({ dataTestId, currency, input, handleChange }) {
  return (
    <StyledBox>
      <StyledTextField
        fullWidth
        value={String(input)}
        onChange={handleChange}
        inputProps={{ "data-testid": dataTestId }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={InputAdornmentStyles}>
              {String(currency && currency.toUpperCase())}
            </InputAdornment>
          ),
          placeholder: "0",
          style: InputPropsStyles,
          type: "number",
        }}
      />
    </StyledBox>
  );
}

export default ConverterInput;
