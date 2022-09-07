import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";

//========================================================
// CUSTOM STYLES
const StyledPagination = styled(Pagination)({
  "& .MuiPagination-ul": {
    height: "5.2rem",
    // width: "fit-content",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // boxShadow: "0 0 0.5rem 0.01rem #b8b8b8",
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
    // backgroundColor: "rgba(184, 184, 184, 0.2)",
    backgroundColor: "rgba(255,255,255,0.2)",
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
    background: "linear-gradient(90deg, #b84dc3, #a620b4)",
    boxShadow: "inset 0 0 3px #000",
  },
  "& .Mui-selected:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
});

//========================================================

function PaginationRounded({ setPage, pageCount }) {
  const handleChange = (event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <Stack spacing={2}>
      <StyledPagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onChange={(event, value) => handleChange(event, value)}
      />
    </Stack>
  );
}

export default PaginationRounded;
