import React, { useState } from "react";
import SearchBox from "../others/search-box";
import TableDisplay from "./table-display";
import Pagination from "../others/pagination";

function TableBox({ data, setData, page, setPage, pageCount }) {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState({});

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch} setFavorites={setFavorites}></SearchBox>
      {/*(setFavorites = { setFavorites })*/}
      <TableDisplay
        search={search}
        data={data}
        setData={setData}
        favorites={favorites}
        page={page}
      ></TableDisplay>
      <Pagination setPage={setPage} pageCount={pageCount}></Pagination>
    </div>
  );
}

export default TableBox;
