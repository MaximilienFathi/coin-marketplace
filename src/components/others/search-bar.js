// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import "./search-bar.css";
//
// function SearchBar({ handleChange }) {
//   return (
//     // <div className="search-container">
//     <form className="search-form">
//       <SearchIcon className="searchIcon"></SearchIcon>
//       <input
//         className="search-bar"
//         onChange={handleChange}
//         placeholder=" Search"
//       />
//     </form>
//     // </div>
//   );
// }
//
// export default SearchBar;

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./search-bar.css";

export default function BasicTextFields() {
  // const TextField = styled(MuiTextField)(({ theme }) => ({
  //   "& .MuiOutlinedInput-root": {
  //     paddingLeft: 0,
  //   },
  //   "& .MuiInputAdornment-root": {
  //     backgroundColor: theme.palette.divider,
  //     padding: "28px 14px",
  //     borderTopLeftRadius: theme.shape.borderRadius + "px",
  //     borderBottomLeftRadius: theme.shape.borderRadius + "px",
  //   },
  // }));
  return (
    // <Box
    //   className="search-form"
    //   component="form"
    //   sx={{
    //     "& > :not(style)": { m: 1, width: "35ch" },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    <Box>
      <TextField
        // label="With normal TextField"
        id="outlined-start-adornment"
        size="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "2rem" }}
              size="normal"
            >
              <SearchIcon />
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
          m: 1,
          width: "25ch",
        }}
      />
    </Box>
  );
}
