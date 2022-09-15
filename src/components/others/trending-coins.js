import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "./coin-card";
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
        setTrendingData(response.data.coins);
        console.log(response.data.coins);
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
      {trendingData.map((data) => (
        <div key={data.item.id}>{data.item.name}</div>
      ))}
      {/*<CoinCard data={trendingData[0]}></CoinCard>*/}
      {/*<CoinCard data={trendingData[1]}></CoinCard>*/}
      {/*<CoinCard data={trendingData[2]}></CoinCard>*/}
      {/*<CoinCard data={trendingData[3]}></CoinCard>*/}
    </div>
  );
}

export default TrendingCoins;
