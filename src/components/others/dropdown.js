import * as React from "react";
import { useContext } from "react";
import currencyContext from "../../contexts/currency-context";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function BasicSelect() {
  const [currencyName, setCurrencyName, , setCurrencySymbol] =
    useContext(currencyContext);

  // Try to see if better way of creating these styles using MUI
  const selectStyles = {
    border: "2px solid #fa58b6",
    borderRadius: "11px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: 48,
  };

  const menuItemStyles = {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: ["Rubik", "sans-serif"],
    fontSize: "1.6rem",
    fontWeight: 600,
  };

  // const CustomSelect = styled(Select)({
  //   "& .MuiOutlinedInput-notchedOutline": {
  //     "&:hover, &.Mui-focusVisible": selectStyles,
  //     "&.Mui-active": selectStyles,
  //   },
  // });

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
    <Box sx={{ minWidth: "10rem" }}>
      <FormControl fullWidth>
        <Select
          size="small"
          value={currencyName}
          onChange={handleChange}
          // focused
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "11px",
                "& .MuiMenu-list": {
                  backgroundColor: "rgb(72,72,112)",
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "rgba(250,88,182,0.5)",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(250,88,182,0.1)",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  backgroundColor: "rgba(250,88,182,0.8)",
                },
              },
            },
          }}
          sx={{
            // height: "10%",
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: ["Rubik", "sans-serif"],
            // htmlFontSize: 10,
            fontSize: "1.6rem",
            fontWeight: 600,
            "& .MuiSvgIcon-root": {
              fontSize: "3rem",
              color: "rgba(255, 255, 255, 0.8)",
            },
            "& .MuiOutlinedInput-notchedOutline": selectStyles,
            "&:hover .MuiOutlinedInput-notchedOutline": selectStyles,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": selectStyles,
          }}
        >
          <MenuItem value={"cad"} sx={menuItemStyles}>
            CAD
          </MenuItem>
          <MenuItem value={"eur"} sx={menuItemStyles}>
            EUR
          </MenuItem>
          <MenuItem value={"usd"} sx={menuItemStyles}>
            USD
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
