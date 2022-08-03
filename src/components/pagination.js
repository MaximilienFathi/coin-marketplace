import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationRounded({ page, setPage, pageCount }) {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onChange={(e) => handleChange(Number(e.target.textContent))}
      />
    </Stack>
  );
}

export default PaginationRounded;
