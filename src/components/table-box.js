import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "./search-box";
import TableDisplay from "./table-display";
import Pagination from "./pagination";

function TableBox(props) {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  // let totalCount = 0;
  // const pageSize = 100;
  // const totalPageCount = Math.ceil(totalCount/pageSize);
  // const

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch}></SearchBox>
      <TableDisplay coins={coins} search={search}></TableDisplay>
      <Pagination page={page} setPage={setPage}></Pagination>
    </div>
  );
}

export default TableBox;
