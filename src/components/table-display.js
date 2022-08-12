import React, { useEffect, useState } from "react";
import TableHeader from "./table-header";
import TableData from "./table-data";

function TableDisplay({ search, data, favorites, setData, page }) {
  const [sortedData, setSortedData] = useState("");

  // Make sure to reset position of sort arrows when changing page
  useEffect(() => setSortedData(""), [page]);

  const dataHeaders = {
    // favorite: "",
    rank: "#",
    name: "Name",
    current_price: "Price",
    price_change_percentage_1h_in_currency: "Change (1h)",
    price_change_percentage_24h_in_currency: "Change (24h)",
    price_change_percentage_7d_in_currency: "Change (7d)",
    total_volume: "Volume (24h)",
    market_cap: "Market Cap",
    // <p>Price Graph (7d)</p>,
  };

  const searchedCoins = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // const favoriteCoins = coins.filter((coin) => coin.id in favorites);
  // console.log(favorites);

  return (
    <div>
      {Object.entries(dataHeaders).map(([dataKey, header]) => {
        return (
          <TableHeader
            // Check why key is needed
            key={dataKey}
            coins={data}
            setCoins={setData}
            dataKey={dataKey}
            header={header}
            sortedData={sortedData}
            setSortedData={setSortedData}
          ></TableHeader>
        );
      })}
      {searchedCoins.map((coin) => {
        return (
          <TableData
            key={coin.id}
            id={coin.id}
            rank={coin.rank}
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
