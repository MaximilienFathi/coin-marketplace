import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/others/header/header";
import CoinCharts from "../components/coin/coin-charts";
import Footer from "../components/others/footer/footer";
import Calculator from "../components/coin/calculator";
import "./coin-page.css";

function CoinPage() {
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
      const data = response.data.market_data;
      const price_data = {};
      price_data.price_change_1h =
        data.price_change_percentage_1h_in_currency[currencyName];
      price_data.price_change_24h =
        data.price_change_percentage_24h_in_currency[currencyName];
      price_data.price_change_7d =
        data.price_change_percentage_7d_in_currency[currencyName];
      price_data.price_change_14d =
        data.price_change_percentage_14d_in_currency[currencyName];
      price_data.price_change_30d =
        data.price_change_percentage_30d_in_currency[currencyName];
      price_data.price_change_1y =
        data.price_change_percentage_1y_in_currency[currencyName];
      setPriceChangesData(price_data);
      console.log("result 2", response.data.market_data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
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
        ></Calculator>
      </div>
      <Footer />
    </div>
  );
}

export default CoinPage;
