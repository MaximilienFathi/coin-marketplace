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
    // Reset scrollbar to top
    window.scrollTo(0, 0);
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
      temp1.rank = response.data.market_cap_rank;
      temp1.homepage = response.data.links.homepage;
      temp1.explorers = response.data.links.blockchain_site;
      temp1.community = {};
      // Leave Discord for later since it can be problematic (see Ethereum)
      // temp1.community = addCommunityLink(
      //   temp1.community,
      //   "Discord",
      //   "",
      //   response.data.links.chat_url
      // );
      temp1.community = addCommunityLink(
        temp1.community,
        "Facebook",
        "https://facebook.com/",
        response.data.links.facebook_username
      );
      temp1.community = addCommunityLink(
        temp1.community,
        "Reddit",
        "",
        response.data.links.subreddit_url
      );
      temp1.community = addCommunityLink(
        temp1.community,
        "Telegram",
        "https://t.me/",
        response.data.links.telegram_channel_identifier
      );
      temp1.community = addCommunityLink(
        temp1.community,
        "Twitter",
        "https://twitter.com/",
        response.data.links.twitter_screen_name
      );
      temp1.code = response.data.links.repos_url.github[0];
      temp1.contractAddress = response.data.contract_address;
      temp1.description = response.data.description.en;
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

  // const addListOfLinks = (linkType) => {};

  const addCommunityLink = (communityLinks, siteName, domain, identifier) => {
    if (identifier) communityLinks[siteName] = domain + identifier;
    return communityLinks;
  };

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
