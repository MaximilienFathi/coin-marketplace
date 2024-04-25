import React, { useContext } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import currencyContext from "../../contexts/currency-context";

//############################################################################

// CUSTOM STYLES
const StyledBox = styled(Box)({ minWidth: "10rem" });

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": {
    zIndex: 1,
    color: "#fff",
    fontFamily: ["Rubik", "sans-serif"],
    fontSize: "1.6rem",
    fontWeight: 600,
    height: 24,
    paddingBottom: 12,
    paddingTop: 12,
    lineHeight: 1.5,
  },
  "& .MuiSvgIcon-root": {
    zIndex: 1,
    fontSize: "3rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderRadius: "11px",
    background: "linear-gradient(90deg, #b84dc3, #a620b4)",
    boxShadow: "inset 0 0 2px #000",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
});

const StyledMenuItem = styled(MenuItem)({
  color: "#fff",
  fontFamily: ["Rubik", "sans-serif"],
  fontSize: "1.6rem",
  fontWeight: 600,
});

//############################################################################

function Dropdown() {
  const [currencyName, setCurrencyName, , setCurrencySymbol] =
    useContext(currencyContext);

  // Update currency name and symbol stored in localStorage upon modification.
  // Update relevant values used via context providers as well.
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
      default:
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

  //############################################################################

  return (
    <StyledBox>
      <FormControl fullWidth>
        <StyledSelect
          value={currencyName}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                border: "2px solid #b84dc3",
                borderRadius: "11px",
                "& .MuiMenu-list": {
                  backgroundColor: "#240c4c",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "#a620b4",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  backgroundColor: "#b84dc3",
                },
              },
            },
          }}
        >
          <StyledMenuItem value={"cad"}>CAD</StyledMenuItem>
          <StyledMenuItem value={"eur"}>EUR</StyledMenuItem>
          <StyledMenuItem value={"usd"}>USD</StyledMenuItem>
        </StyledSelect>
      </FormControl>
    </StyledBox>
  );
}

export default Dropdown;
