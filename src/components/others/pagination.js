import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

//========================================================
// CUSTOM STYLES
const StyledPagination = styled(Pagination)({
  "& .MuiPagination-ul": {
    height: "5.2rem",
    // width: "fit-content",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: 11,

    alignSelf: "center",
    justifyContent: "center",
    gap: 8,
  },
  "& .MuiButtonBase-root": {
    fontFamily: "inherit",
    color: "inherit",
    fontSize: "1.6rem",
    height: "3.6rem",
    width: "3.6rem",
    // boxShadow: "0 0 0.2rem 0.01rem #b8b8b8",
    backgroundColor: "rgba(255,255,255,0.2)", // bugged
    border: "none",
    borderRadius: "11px",
  },
  "& .MuiPaginationItem-ellipsis, .MuiPaginationItem-icon": {
    fontFamily: "inherit",
    color: "inherit",
    fontSize: "1.6rem",
  },
  "& .MuiButtonBase-root:hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  "& .Mui-selected": {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});

//========================================================

function PaginationRounded({ setPage, pageCount }) {
  const handleChange = (e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <Stack spacing={2}>
      <StyledPagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onChange={(e, value) => handleChange(e, value)}
      />
    </Stack>
  );
}

export default PaginationRounded;
