import React, { useState } from "react";
import SearchBox from "../others/search-box";
import TableDisplay from "./table-display";
import Pagination from "../others/pagination";

function TableBox({
  data,
  setData,
  fullDataList,
  page,
  setPage,
  pageCount,
  setPageCount,
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch}></SearchBox>
      <TableDisplay
        search={search}
        data={data}
        setData={setData}
        fullDataList={fullDataList}
        page={page}
        pageCount={pageCount}
        setPageCount={setPageCount}
      ></TableDisplay>
      <Pagination setPage={setPage} pageCount={pageCount}></Pagination>
    </div>
  );
}

export default TableBox;
