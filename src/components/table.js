import React, { useEffect, useInsertionEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./search-bar";
import Row from "./row";

function Table(props) {
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

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table">
      {/* SearchBar was moved from Header to Table as I could not have data be
         shared between sibling components - Anti-pattern (solution = Redux) */}
      <SearchBar handleChange={handleChange}></SearchBar>
      {filteredCoins.map((coin) => {
        return (
          <Row
            key={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            current_price={coin.current_price}
            price_change_percentage_24h={coin.price_change_percentage_24h}
            total_volume={coin.total_volume}
            market_cap={coin.market_cap}
          ></Row>
        );
      })}
    </div>
  );
}

export default Table;
