import React, { useContext, useEffect, useState } from "react";

import currentPageContext from "../../contexts/current-page-context";
import paginatedDataContext from "../../contexts/paginated-data-context";
import TableHeader from "../others/table-header/table-header";
import TableData from "./table-data";
import "./table-rows.css";

//############################################################################

function TableRows({ searchQuery }) {
  const [currentPage] = useContext(currentPageContext);
  const [paginatedData, setPaginatedData] = useContext(paginatedDataContext);

  const [searchResults, setSearchResults] = useState([]);
  const [sortedData, setSortedData] = useState("");
  // "sortedData" state represents the header whose set of data is sorted.

  const dataHeaders = {
    favorite: "",
    market_cap_rank: "#",
    name: "Name",
    current_price: "Price",
    price_change_percentage_1h_in_currency: "Change (1h)",
    price_change_percentage_24h_in_currency: "Change (24h)",
    price_change_percentage_7d_in_currency: "Change (7d)",
    total_volume: "Volume (24h)",
    market_cap: "Market Cap",
  };

  //############################################################################

  // Reset position of sort arrows when changing page.
  useEffect(() => setSortedData(""), [currentPage]);

  //############################################################################

  return (
    <table className="coins-table">
      <thead className="coins-table-head">
        <tr className="coins-table-row">
          <th>{dataHeaders.favorite}</th>
          {Object.entries(dataHeaders)
            .slice(1)
            .map(([headerKey, headerName]) => {
              return (
                <TableHeader
                  key={headerKey}
                  headerKey={headerKey}
                  headerName={headerName}
                  data={searchQuery ? searchResults : paginatedData}
                  setData={searchQuery ? setSearchResults : setPaginatedData}
                  sortedData={sortedData}
                  setSortedData={setSortedData}
                ></TableHeader>
              );
            })}
        </tr>
      </thead>
      <tbody className="coins-table-body">
        {(searchQuery ? searchResults : paginatedData).map((coin) => {
          return (
            <TableData
              key={coin.id}
              id={coin.id}
              market_cap_rank={coin.market_cap_rank}
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol}
              current_price={coin.current_price}
              price_change_percentage_1h_in_currency={
                coin.price_change_percentage_1h_in_currency
              }
              price_change_percentage_24h_in_currency={
                coin.price_change_percentage_24h_in_currency
              }
              price_change_percentage_7d_in_currency={
                coin.price_change_percentage_7d_in_currency
              }
              total_volume={coin.total_volume}
              market_cap={coin.market_cap}
            ></TableData>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableRows;
