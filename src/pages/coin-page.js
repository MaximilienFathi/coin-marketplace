import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/others/header/header";
import CoinCharts from "../components/coin/coin-charts";
import Footer from "../components/others/footer/footer";
import Calculator from "../components/coin/calculator";
import "./coin-page.css";

function CoinPage() {
  const [currencyRates, setCurrencyRates] = useState({});
  const [priceChangesData, setPriceChangesData] = useState({});
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const location = useLocation();
  const { coinID, coinName, coinSymbol } = location.state;

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
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

  // Fetch data for a specific coin
  useEffect(() => {
    fetchPriceChanges();
  }, [currencyName]);

  async function fetchPriceChanges() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}`
      );
      const market_data = response.data.market_data;
      const price_data = {};
      price_data.price_change_1h =
        market_data.price_change_percentage_1h_in_currency[currencyName];
      price_data.price_change_24h =
        market_data.price_change_percentage_24h_in_currency[currencyName];
      price_data.price_change_7d =
        market_data.price_change_percentage_7d_in_currency[currencyName];
      price_data.price_change_14d =
        market_data.price_change_percentage_14d_in_currency[currencyName];
      price_data.price_change_30d =
        market_data.price_change_percentage_30d_in_currency[currencyName];
      price_data.price_change_1y =
        market_data.price_change_percentage_1y_in_currency[currencyName];
      setPriceChangesData(price_data);
      setCurrencyRates(market_data.current_price);
      console.log("result 2", response.data.market_data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="coin-page-container">
      <Header />
      <div className="coin-page-content-wrap content-wrap">
        <CoinCharts
          coinID={coinID}
          coinName={coinName}
          currencyName={currencyName}
          currencySymbol={currencySymbol}
          priceChangesData={priceChangesData}
        />
        <Calculator
          coinSymbol={coinSymbol}
          currencyName={currencyName}
          currencySymbol={currencySymbol}
          currencyRates={currencyRates}
        ></Calculator>
      </div>
      <Footer />
    </div>
  );
}

export default CoinPage;
