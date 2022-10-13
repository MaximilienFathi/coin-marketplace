import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/others/header/header";
import MainInfo from "../components/coin/main-info";
import CoinCharts from "../components/coin/coin-charts";
import Footer from "../components/others/footer/footer";
import Calculator from "../components/coin/calculator";
import Swapper from "../components/coin/swapper";
import "./coin-page.css";
import favoritesContext from "../contexts/favorites-context";

function CoinPage() {
  const [mainInfoData, setMainInfoData] = useState({});
  const [currencyRates, setCurrencyRates] = useState({});
  const [priceChangesData, setPriceChangesData] = useState({});
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const location = useLocation();
  const { coinID, coinName, coinSymbol } = location.state;
  const [favoritesChanged, setFavoritesChanged] = useState(false);

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

  //############################################################################

  // Fetch data for a specific coin
  useEffect(() => {
    fetchCoinData();
  }, [currencyName]);

  async function fetchCoinData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}`
      );
      const market_data = response.data.market_data;
      console.log("result 2", response.data);

      const temp1 = {};
      temp1.image = response.data.image.small;
      temp1.name = response.data.name;
      temp1.symbol = response.data.symbol;
      setMainInfoData(temp1);

      const temp2 = {};
      temp2.price_change_1h =
        market_data.price_change_percentage_1h_in_currency[currencyName];
      temp2.price_change_24h =
        market_data.price_change_percentage_24h_in_currency[currencyName];
      temp2.price_change_7d =
        market_data.price_change_percentage_7d_in_currency[currencyName];
      temp2.price_change_14d =
        market_data.price_change_percentage_14d_in_currency[currencyName];
      temp2.price_change_30d =
        market_data.price_change_percentage_30d_in_currency[currencyName];
      temp2.price_change_1y =
        market_data.price_change_percentage_1y_in_currency[currencyName];
      setPriceChangesData(temp2);

      setCurrencyRates(market_data.current_price);
    } catch (err) {
      console.error(err);
    }
  }

  //############################################################################

  return (
    <favoritesContext.Provider value={[favoritesChanged, setFavoritesChanged]}>
      <div className="coin-page-container">
        <Header />
        <div className="coin-page-content-wrap content-wrap">
          <MainInfo mainInfoData={mainInfoData} coinID={coinID}></MainInfo>
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
          <Swapper></Swapper>
        </div>
        <Footer />
      </div>
    </favoritesContext.Provider>
  );
}

export default CoinPage;
