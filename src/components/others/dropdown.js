import * as React from "react";
import { useContext, useState } from "react";
import currencyContext from "../../contexts/currency-context";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currencyName}
          label="Currency"
          onChange={handleChange}
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
