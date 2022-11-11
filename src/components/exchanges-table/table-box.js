import React, { useState } from "react";
import SearchBox from "../others/search-box/search-box";
import TableDisplay from "./table-display";
import Pagination from "../others/pagination";
import "../coins-table/table-box.css"; // change location of that css file?

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
    <div className="table-container">
      <SearchBox setSearch={setSearch}></SearchBox>
      <TableDisplay
        search={search}
        data={data}
        setData={setData}
        fullDataList={fullDataList}
        page={page}
        setPageCount={setPageCount}
      ></TableDisplay>
      <Pagination setPage={setPage} pageCount={pageCount}></Pagination>
    </div>
  );
}

export default TableBox;
