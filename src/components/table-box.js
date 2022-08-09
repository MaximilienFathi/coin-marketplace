import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "./search-box";
import TableDisplay from "./table-display";
import Pagination from "./pagination";

function TableBox() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 100;
  const findPageCount = (data) => setPageCount(Math.ceil(data / pageSize));

  // ISSUE - Cannot update coins and then use it as it always gives []
  // So passing coins straight from res.data via "data" parameter
  const findCoinRank = (data, coin) =>
    (page - 1) * pageSize + data.indexOf(coin) + 1;

  const addRankToCoins = (data) =>
    data.map((coin) => ({ ...coin, rank: findCoinRank(data, coin) }));

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => {
        findPageCount(res.data.data.active_cryptocurrencies);
        console.log(res.data.data.active_cryptocurrencies);
      })
      .catch((err) => console.log(err));
  }, []); // findPageCount - if included, runs too many times (remove []?)

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((res) => {
        setCoins(addRankToCoins(res.data));
      })
      .catch((err) => console.error(err));
  }, [page]); // This will run everytime page changes.

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch} setFavorites={setFavorites}></SearchBox>
      <TableDisplay
        search={search}
        coins={coins}
        favorites={favorites}
        setCoins={setCoins}
        page={page}
      ></TableDisplay>
      <Pagination setPage={setPage} pageCount={pageCount}></Pagination>
    </div>
  );
}

export default TableBox;
