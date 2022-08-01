import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "./search-box";
import TableDisplay from "./table-display";
import Pagination from "./pagination";

function TableBox(props) {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="table">
      {/* SearchBar was moved from Header to TableBox as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBox setSearch={setSearch}></SearchBox>
      <TableDisplay coins={coins} search={search}></TableDisplay>
      <Pagination></Pagination>
    </div>
  );
}

export default TableBox;
