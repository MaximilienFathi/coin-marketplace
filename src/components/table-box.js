import React, { useState } from "react";
import SearchBox from "./search-box";
import TableDisplay from "./table-display";
import Pagination from "./pagination";

function TableBox({ data, setData, page, setPage, pageCount }) {
  const [search, setSearch] = useState("");

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch}></SearchBox>
      {/*(setFavorites = { setFavorites })*/}
      <TableDisplay
        search={search}
        data={data}
        setData={setData}
        page={page}
      ></TableDisplay>
      <Pagination setPage={setPage} pageCount={pageCount}></Pagination>
    </div>
  );
}

export default TableBox;
