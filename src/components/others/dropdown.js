import * as React from "react";
import { useContext, useState } from "react";
import currencyContext from "../../contexts/currency-context";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./dropdown.css";

function BasicSelect() {
  const [currencyName, setCurrencyName, , setCurrencySymbol] =
    useContext(currencyContext);

  const handleChange = (event) => {
    const chosenCurrencyName = event.target.value;
    let chosenCurrencySymbol = "";
    setCurrencyName(chosenCurrencyName);
    switch (chosenCurrencyName) {
      case "cad":
        chosenCurrencySymbol = "$";
        setCurrencySymbol(chosenCurrencySymbol);
        break;
      case "eur":
        chosenCurrencySymbol = "€";
        setCurrencySymbol(chosenCurrencySymbol);
        break;
      case "usd":
        chosenCurrencySymbol = "$";
        setCurrencySymbol(chosenCurrencySymbol);
        break;
    }
    let currency = JSON.parse(localStorage.getItem("currency"));
    currency = {
      ...currency,
      name: chosenCurrencyName,
      symbol: chosenCurrencySymbol,
    };
    localStorage.setItem("currency", JSON.stringify(currency));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/*<InputLabel*/}
        {/*  id="simple-select-label"*/}
        {/*  sx={[("& label.Mui-focused": { color: "green" })]}*/}
        {/*>*/}
        {/*  Currency*/}
        {/*</InputLabel>*/}
        <Select
          // labelId="simple-select-label"
          // label="Currency"
          id="simple-select"
          value={currencyName}
          onChange={handleChange}
          sx={[
            {
              // background: "linear-gradient(45deg, red, blue)",
              color: "rgba(255, 255, 255, 0.8)",
              fontFamily: ["Rubik", "sans-serif"],
              // htmlFontSize: 10,
              fontSize: "1.6rem",
              fontWeight: 600,
              border: "2px solid #fa58b6",
              borderRadius: "11px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "red" },
              },
              "& .MuiSvgIcon-root": {
                fontSize: "3rem",
                color: "rgba(255," + " 255, 255, 0.8)",
              },
              "& label.Mui-focused": {
                color: "green",
              },
            },
          ]}
        >
          <MenuItem value={"cad"}>CAD</MenuItem>
          <MenuItem value={"eur"}>EUR</MenuItem>
          <MenuItem value={"usd"}>USD</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
