import React, { useEffect, useState } from "react";
import axios from "axios";

import CoinCard from "../coin-card/coin-card";
import "./trending-coins.css";

import CircularProgress from "@mui/material/CircularProgress";
// import axiosRetry from "axios-retry";
// // axiosRetry(axios, { retries: 3 });
// axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

//############################################################################

export default function TrendingCoins() {
  const [trendingData, setTrendingData] = useState([]);

  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  const [loading, setLoading] = useState(true);

  //############################################################################

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

  // Create fully updated data object for each trendy coin
  useEffect(() => {
    fetchTrendingCoinData();
  }, []);

  //############################################################################

  // Get top 4 trending coins
  async function fetchTrendingCoinData() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      const fullData = response.data.coins;
      const slicedData = fullData.slice(0, 4);
      const updatedData = await updateAllCoinData(slicedData);
      setTrendingData(updatedData);
    } catch (err) {
      // console.error(err);
      // fetchTrendingCoinData();
    } finally {
      setLoading(false);
    }
  }

  // Fetch specific data for each trendy coin
  const updateAllCoinData = async function (slicedData) {
    return await Promise.all(
      slicedData.map(async (coin) => {
        try {
          // Get market data for each coin
          const coin_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}`
          );
          // await new Promise((resolve) => setTimeout(resolve, 5000));
          // Get last 24h of data for charts
          const chart_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.item.id}/market_chart?vs_currency=${currencyName}&days=1`
          );
          // await new Promise((resolve) => setTimeout(resolve, 5000));
          const updatedData = addCoinData(
            coin.item,
            coin_response.data,
            chart_response.data.prices
          );
          return updatedData;
        } catch (err) {
          // console.error(err);
          console.log("TESTING");
          // updateAllCoinData(slicedData);
        }
      })
    );
  };

  // Update each trendy coin data object by adding previously gathered data
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

  //############################################################################

  return (
    <div className="trending-coins-outer-container">
      <h3 className="trending-coins-subheading">Trending coins</h3>
      <h2 className="trending-coins-heading">
        Most Searched Cryptocurrencies Today
      </h2>
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="trending-coins-inner-container">
            {trendingData.map((data) => {
              return (
                <CoinCard
                  key={data.id}
                  id={data.id}
                  name={data.name}
                  symbol={data.symbol}
                  logo={data.small}
                  current_price={data.current_price}
                  currencyName={currencyName}
                  currencySymbol={currencySymbol}
                  price_change={data.price_change_percentage_24h_in_currency}
                  historicData={data.historicData}
                ></CoinCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
