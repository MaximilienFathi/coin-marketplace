import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../coin-card/coin-card";
import "./trending-coins.css";

function TrendingCoins() {
  const [trendingData, setTrendingData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // Update each coin by adding new properties
  const addCoinData = function (oldCoinData, newCoinData, historicData) {
    const marketData = newCoinData.market_data;
    return {
      ...oldCoinData,
      current_price: marketData.current_price["usd"], // current_price[currencyName],
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency["usd"], // [currencyName]
      historicData: historicData,
    };
  };

  // Update all coins all together by fetching new data
  const updateAllCoinData = async function (slicedData) {
    return await Promise.all(
      slicedData.map(async (coin) => {
        try {
          const coin_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}`
          );
          const chart_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}/market_chart?vs_currency=usd&days=1` // Must be last 24 hours data like API did
          );
          const updatedData = addCoinData(
            coin.item,
            coin_response.data,
            chart_response.data.prices
          );
          return updatedData;
        } catch (err) {
          console.error(err);
        }
      })
    );
  };

  // Fetch original data for first top 4 trending coins and update it
  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const fullData = response.data.coins;
        const slicedData = fullData.slice(0, 4);
        const updatedData = await updateAllCoinData(slicedData);
        setTrendingData(updatedData);
        console.log("result 2", updatedData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="trending-coins-container">
      {trendingData.map((data) => {
        return (
          <CoinCard
            key={data.id}
            name={data.name}
            symbol={data.symbol}
            logo={data.small}
            // logo={data.thumb}
            // logo={data.large}
            current_price={data.current_price}
            price_change={data.price_change_percentage_24h_in_currency}
            historicData={data.historicData}
          ></CoinCard>
        );
      })}
    </div>
  );
}

export default TrendingCoins;
