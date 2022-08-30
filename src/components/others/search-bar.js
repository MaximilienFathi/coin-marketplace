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
import "./search-bar.css";

export default function BasicTextFields() {
  return (
    <Box
      className="search-form"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        multiline
      />
    </Box>
  );
}
