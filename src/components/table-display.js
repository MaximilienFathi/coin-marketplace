import React from "react";
import TableHeader from "./table-header";
import TableData from "./table-data";

function TableDisplay({ coins, search }) {
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TableHeader></TableHeader>
      {filteredCoins.map((coin) => {
        return (
          <TableData
            key={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            current_price={coin.current_price}
            price_change_percentage_24h={coin.price_change_percentage_24h}
            total_volume={coin.total_volume}
            market_cap={coin.market_cap}
          ></TableData>
        );
      })}
    </div>
  );
}

export default TableDisplay;
