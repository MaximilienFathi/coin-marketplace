import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../coin-card/coin-card";
import "./trending-coins.css";

function TrendingCoins() {
  const [trendingData, setTrendingData] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    (async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const fullData = response.data.coins;
        setTrendingData(fullData.slice(0, 4));
        console.log(fullData.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    })();
    // setLoading(false);
  }, []);

  // if (loading) {
  //   return <h1> Data is loading...</h1>;
  // }

  return (
    <div className="trending-coins-container">
      {trendingData.map((data) => {
        return (
          <CoinCard
            key={data.item.id}
            name={data.item.name}
            price_btc={data.item.price_btc}
            symbol={data.item.symbol}
            logo={data.item.small}
            // logo={data.item.thumb}
            // logo={data.item.large}
          ></CoinCard>
        );
      })}
    </div>
  );
}

export default TrendingCoins;
