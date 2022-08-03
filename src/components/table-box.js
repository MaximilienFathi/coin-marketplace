import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "./search-box";
import TableDisplay from "./table-display";
import Pagination from "./pagination";

function TableBox(props) {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  // const pageSize = 100;
  const findPageCount = (data) => setPageCount(Math.ceil(data / pageSize));

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => {
        findPageCount(res.data.data.active_cryptocurrencies);
        console.log(res.data.data.active_cryptocurrencies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch}></SearchBox>
      <TableDisplay
        search={search}
        coins={coins}
        pageSize={pageSize}
        page={page}
      ></TableDisplay>
      <Pagination
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      ></Pagination>
    </div>
  );
}

export default TableBox;
