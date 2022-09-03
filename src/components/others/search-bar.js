import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./search-bar.css";

//========================================================
// CUSTOM STYLES
const StyledBox = styled(Box)({ minWidth: "30rem" });

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      border: "2px solid #fa58b6",
      borderRadius: "11px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  // "& .MuiFormControl-root": { height: "100%" },
  // "& .MuiTextField-root": { height: "100%" },
  "& .MuiInputBase-root": { height: 48 },
});

const StyledSearchIcon = styled(SearchIcon)({
  color: "rgba(255, 255, 255, 0.8)",
  height: "2rem",
  width: "auto",
});

const InputPropsStyles = {
  fontFamily: ["Rubik", "sans-serif"],
  // htmlFontSize: 10,
  fontSize: "1.6rem",
  fontWeight: 600,
  color: "rgba(255, 255, 255, 0.8)",
};
//========================================================

function BasicTextFields({ handleChange }) {
  return (
    <StyledBox>
      <StyledTextField
        onChange={handleChange}
        focused
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StyledSearchIcon />
            </InputAdornment>
          ),
          placeholder: " Search",
          style: InputPropsStyles,
        }}
      />
    </StyledBox>
  );
}

export default BasicTextFields;
