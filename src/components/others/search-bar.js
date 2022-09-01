import * as React from "react";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./search-bar.css";

function BasicTextFields({ handleChange }) {
  return (
    <Box sx={{ minWidth: "30rem" }}>
      <TextField
        onChange={handleChange}
        fullWidth
        size="large"
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              <SearchIcon sx={{ height: "2rem", width: "auto" }} />
            </InputAdornment>
          ),
          style: {
            fontFamily: ["Rubik", "sans-serif"],
            // htmlFontSize: 10,
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.8)",
          },
          placeholder: " Search",
        }}
        focused
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              border: "2px solid #fa58b6",
              borderRadius: "11px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        }}
      />
    </Box>
  );
}

export default BasicTextFields;
