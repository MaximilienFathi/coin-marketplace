import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

//############################################################################

// CUSTOM STYLES
const StyledBox = styled(Box)({ minWidth: "30rem" });

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root, .MuiInputBase-root:hover": {
    backgroundColor: "#240c4c",
    borderRadius: "11px",
    "& > fieldset": {
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiInputBase-root.Mui-focused": {
    "& > fieldset": {
      transition: "all 0.5s",
      boxShadow: "0 0 0.5rem 0.2rem #b84dc3",
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiInputBase-input": { height: 24, paddingBottom: 12, paddingTop: 12 },
});

const StyledSearchIcon = styled(SearchIcon)({
  color: "#fff",
  height: 24,
  width: "auto",
});

const InputPropsStyles = {
  // htmlFontSize: 10,
  fontFamily: "inherit",
  fontSize: "1.6rem",
  fontWeight: 600,
  color: "inherit", // rgba(255, 255, 255, 0.8)
};

//############################################################################

export default function BasicTextFields({ handleChange }) {
  return (
    <StyledBox>
      <StyledTextField
        onChange={handleChange}
        // focused
        fullWidth
        // size="small"
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
