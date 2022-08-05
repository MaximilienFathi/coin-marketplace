import React from "react";
import TableHeader from "./table-header";
import TableData from "./table-data";

function TableDisplay({ search, coins, pageSize, page }) {
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const findCoinRank = (coin) =>
    (page - 1) * pageSize + coins.indexOf(coin) + 1;

  return (
    <div>
      <TableHeader></TableHeader>
      {filteredCoins.map((coin) => {
        return (
          <TableData
            key={coin.id}
            id={coin.id}
            rank={findCoinRank(coin)}
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
