import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../coin-card/coin-card";
import "./trending-coins.css";

import CircularProgress from "@mui/material/CircularProgress";

function TrendingCoins() {
  const [trendingData, setTrendingData] = useState([]);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // const [loading, setLoading] = useState(true);

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
    // Favorites data
    localStorage.getItem("favorites") ||
      localStorage.setItem("favorites", "[]");
    // Currency data
    if (localStorage.getItem("currency")) {
      setCurrencyName(JSON.parse(localStorage.getItem("currency"))["name"]);
      setCurrencySymbol(JSON.parse(localStorage.getItem("currency"))["symbol"]);
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem(
        "currency",
        JSON.stringify({ name: currencyName, symbol: currencySymbol })
      );
    }
  }, [currencyName]);

  // Update each coin by adding new properties
  const addCoinData = function (oldCoinData, newCoinData, historicData) {
    const marketData = newCoinData.market_data;
    return {
      ...oldCoinData,
      current_price: marketData.current_price[currencyName],
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency[currencyName],
      historicData: historicData,
    };
  };

  // Update all coins-table all together by fetching new data
  const updateAllCoinData = async function (slicedData) {
    return await Promise.all(
      slicedData.map(async (coin) => {
        try {
          const coin_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}`
          );
          // Chart for last 24 hours of data
          const chart_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}/market_chart?vs_currency=${currencyName}&days=1`
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

  // Fetch original data for first top 4 trending coins-table and update it
  useEffect(() => {
    (async function fetchData() {
      try {
        console.log("TEST TRENDING-PAGE");
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        console.log(response);
        const fullData = response.data.coins;
        const slicedData = fullData.slice(0, 4);
        const updatedData = await updateAllCoinData(slicedData);
        setTrendingData(updatedData);
      } catch (err) {
        console.error(err);
      }
      // finally {
      //   setLoading(false);
      // }
    })();
  }, []);

  return (
    <div className="trending-coins-outer-container">
      <h3 className="trending-coins-subheading">Trending coins</h3>
      <h2 className="trending-coins-heading">
        Most Searched Cryptocurrencies Today
      </h2>
      {/*<div>*/}
      {/*  {loading ? (*/}
      {/*    <CircularProgress />*/}
      {/*  ) : (*/}
      <div className="trending-coins-inner-container">
        {trendingData.map((data) => {
          return (
            <CoinCard
              key={data.id}
              id={data.id}
              name={data.name}
              symbol={data.symbol}
              logo={data.small}
              // logo={data.thumb}
              // logo={data.large}
              current_price={data.current_price}
              currencyName={currencyName}
              currencySymbol={currencySymbol}
              price_change={data.price_change_percentage_24h_in_currency}
              historicData={data.historicData}
            ></CoinCard>
          );
        })}
      </div>
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}

export default TrendingCoins;
