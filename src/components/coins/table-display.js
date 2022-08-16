import React, { useEffect, useState } from "react";
import TableHeader from "../others/table-header";
import TableData from "./table-data";

function TableDisplay({ search, data, setData, page }) {
  const [sortedData, setSortedData] = useState("");

  // Make sure to reset position of sort arrows when changing page
  useEffect(() => setSortedData(""), [page]);

  const dataHeaders = {
    // favorite: "",
    market_cap_rank: "#",
    name: "Name",
    current_price: "Price",
    price_change_percentage_1h_in_currency: "Change (1h)",
    price_change_percentage_24h_in_currency: "Change (24h)",
    price_change_percentage_7d_in_currency: "Change (7d)",
    total_volume: "Volume (24h)",
    market_cap: "Market Cap",
    // <p>Price Graph (7d)</p>,
  };

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {Object.entries(dataHeaders).map(([headerKey, headerName]) => {
        return (
          <TableHeader
            // Check why key is needed
            key={headerKey}
            data={data}
            setData={setData}
            headerKey={headerKey}
            headerName={headerName}
            sortedData={sortedData}
            setSortedData={setSortedData}
          ></TableHeader>
        );
      })}
      {filteredData.map((coin) => {
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
    </div>
  );
}

export default TableDisplay;