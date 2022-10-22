import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//========================================================
// CUSTOM STYLES
const StyledBox = styled(Box)({ minWidth: "30rem" });

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
  "& .MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "1.8rem",
    fontWeight: 500,
    color: "rgb(255, 255, 255)", // rgba(255, 255, 255, 0.8)
  },
  // "& .MuiInputBase-input": { height: 24, paddingBottom: 12, paddingTop: 12 },
});

const InputPropsStyles = {
  // htmlFontSize: 10,
  fontFamily: "inherit",
  fontSize: "1.8rem",
  fontWeight: 600,
  color: "inherit", // rgba(255, 255, 255, 0.8)
};

const InputAdornmentStyles = {
  width: "6rem",
  height: "auto",
  padding: "0.8rem 1.4rem",
  marginRight: "1.2rem",
  borderRadius: "11px",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
  justifyContent: "center",
};
//========================================================

function SwapOptionInput({
  currency1,
  currency2,
  input1,
  input2,
  inputOrder,
  handleChange,
}) {
  // useEffect(() => {
  //   handleChange(this);
  // }, [input1]);

  return (
    <StyledBox>
      <StyledTextField
        // focused
        // size="small"
        fullWidth
        value={String(inputOrder === 1 ? input1 : input2)}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={InputAdornmentStyles}>
              {/*<div className="">*/}
              {String(
                inputOrder === 1
                  ? currency1.toUpperCase()
                  : currency2.toUpperCase()
              )}
              {/*</div>*/}
            </InputAdornment>
          ),
          placeholder: "0",
          style: InputPropsStyles,
          type: "number",
          // inputMode: "numeric",
          // pattern: "[^0-9]*",
        }}
      />
    </StyledBox>
  );
}

export default SwapOptionInput;
