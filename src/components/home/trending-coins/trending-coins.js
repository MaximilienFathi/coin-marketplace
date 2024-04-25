import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currencyContext from "../../../contexts/currency-context";
import trendingCoinsListContext from "../../../contexts/trending-coins-list-context";
import CoinCard from "../coin-card/coin-card";
import "./trending-coins.css";

//############################################################################

function TrendingCoins() {
  const [currencyName, , currencySymbol] = useContext(currencyContext);
  const [trendingCoinsList] = useContext(trendingCoinsListContext);

  const [fourTrendingCoinsData, setFourTrendingCoinsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartHistoricLength = 1;
  const API_KEY = process.env.REACT_APP_API_KEY;

  //############################################################################

  // Update top 4 trending coins data objects.
  useEffect(() => {
    trendingCoinsList && updateFourTrendingCoinsData().then();
  }, [trendingCoinsList]);

  // Fetch more data to update current list of top 4 trending coins.
  async function updateFourTrendingCoinsData() {
    const slicedTrendingCoinsList = trendingCoinsList.slice(0, 4);
    const coinsUpdatedData = await Promise.all(
      slicedTrendingCoinsList.map(async function fetchTrendingCoinData(coin) {
        try {
          // Get market data for each coin
          console.log(
            `Sending request for fetchTrendingCoinData (${coin.id}) (1/2)`
          );
          const coin_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.id}?x_cg_demo_api_key=${API_KEY}`
          );
          // Get last 24h of data for each coin chart
          console.log(
            `Sending request for fetchTrendingCoinData (${coin.id}) (2/2)`
          );
          const chart_response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currencyName}&days=${chartHistoricLength}?x_cg_demo_api_key=${API_KEY}`
          );
          if (coin_response && chart_response) {
            setLoading(false);
          }
          return updateData(
            coin,
            coin_response.data,
            chart_response.data.prices
          );
        } catch (err) {
          if (err.response.status === 404) {
            console.log("ERROR 404 FOUND");
            setLoading(false);
            throw new Response("Not Found", { status: 404 });
          } else {
            console.log("NETWORK ERROR FOUND");
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return await fetchTrendingCoinData(coin);
          }
        }
      })
    );
    setFourTrendingCoinsData(coinsUpdatedData);
  }

  // Return new version of current trending coin object with more data.
  function updateData(oldCoinData, newCoinData, historicData) {
    const marketData = newCoinData["market_data"];
    return {
      ...oldCoinData,
      current_price: marketData.current_price[currencyName],
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency[currencyName],
      historicData: historicData,
    };
  }

  //############################################################################

  return (
    <div className="trending-coins-outer-container">
      <h3 className="trending-coins-subheading">Trending coins</h3>
      <h2 className="trending-coins-heading">
        Most Searched Cryptocurrencies Today
      </h2>
      <div className="trending-coins-inner-container">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.6rem",
            }}
          >
            <CircularProgress
              style={{ color: "#b84dc3" }}
              size={200}
              thickness={1}
            />
            <Typography
              variant="caption"
              component="div"
              color="#dc7be7"
              fontSize="2rem"
            >{`Network Error - Data Will Load Soon!`}</Typography>
          </Box>
        ) : (
          fourTrendingCoinsData?.map((data) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default TrendingCoins;
