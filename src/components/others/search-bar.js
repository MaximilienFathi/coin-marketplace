import React, { useContext, useEffect, useState } from "react";
import { InputAdornment, Paper, styled } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import coinsListContext from "../../contexts/coins-list-context";
import exchangesListContext from "../../contexts/exchanges-list-context";
import trendingCoinsListContext from "../../contexts/trending-coins-list-context";

//############################################################################

// CUSTOM STYLES
const StyledTextField = styled(TextField)({
  minWidth: "30rem",
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
  fontFamily: "inherit",
  fontSize: "1.6rem",
  fontWeight: 600,
  color: "inherit",
};

const GroupHeader = styled("div")({
  padding: "1.2rem 1.6rem",
  fontFamily: ["Rubik", "sans-serif"],
  fontSize: "1.4rem",
  fontWeight: 600,
  color: "#b8b8b8",
});

const GroupItems = styled("ul")({
  fontFamily: ["Rubik", "sans-serif"],
  fontSize: "1.6rem",
  fontWeight: 600,
  color: "#fff",
  "& .MuiAutocomplete-option": {
    padding: "0.8rem 3.2rem",
  },
  "& .MuiAutocomplete-option.Mui-focused": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: "#a620b4",
  },
  "& .MuiAutocomplete-option.Mui-focused[aria-selected='true']": {
    backgroundColor: "#b84dc3",
  },
});

//############################################################################

function SearchBar() {
  const [coinsList] = useContext(coinsListContext);
  const [exchangesList] = useContext(exchangesListContext);
  const [trendingCoinsList] = useContext(trendingCoinsListContext);

  const [options, setOptions] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Limit to 7 to not slow down search process significantly.
  // Represents maximum number of options to display in autocomplete.
  const filterOptions = createFilterOptions({ limit: 7 });

  //############################################################################

  // By default, set options to be displayed in autocomplete to
  // trendingCoinsList options.
  useEffect(() => {
    setOptions(trendingCoinsList);
  }, [trendingCoinsList]);

  // Update searchQuery state upon selecting an option in autocomplete.
  function handleAutocompleteChange(value) {
    value && setSearchQuery(value["id"]);
  }

  // Update searchQuery state upon updating search query in text field.
  function handleTextFieldChange(event) {
    if (event.target.value.length === 0) setOptions(trendingCoinsList);
    if (event.target.value.length !== 0)
      setOptions([...coinsList, ...exchangesList]);
    setSearchQuery(event.target.value);
  }

  // Redirect to specific coin page upon pressing "enter" in the search bar.
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      window.location = `${
        process.env.PUBLIC_URL
      }/coins/${searchQuery.toLowerCase()}`;
    }
  }

  //############################################################################

  return (
    options && (
      <Autocomplete
        freeSolo
        filterOptions={filterOptions}
        disablePortal
        id="search-combo-box"
        options={options}
        groupBy={(listItem) => listItem["type"]}
        getOptionLabel={(listItem) => listItem["name"] || ""}
        PaperComponent={({ children }) => (
          <Paper
            style={{
              border: "2px solid #b84dc3",
              borderRadius: "11px",
              backgroundColor: "#240c4c",
            }}
          >
            {children}
          </Paper>
        )}
        onChange={(event, value) => handleAutocompleteChange(value)}
        onKeyDown={handleKeyPress}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            fullWidth
            onChange={(event) => handleTextFieldChange(event)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <StyledSearchIcon />
                </InputAdornment>
              ),
              placeholder: " Search",
              style: InputPropsStyles,
            }}
          />
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    )
  );
}

export default SearchBar;
