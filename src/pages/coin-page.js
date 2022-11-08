import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import favoritesContext from "../contexts/favorites-context";
import Header from "../components/others/header/header";
import MarketInfo from "../components/coin/market-info/market-info";
import CoinBalance from "../components/coin/coin-balance/coin-balance";
import CoinCharts from "../components/coin/coin-charts/coin-charts";
import Swapper from "../components/coin/swapper/swapper";
import CoinDescription from "../components/coin/coin-description/coin-description";
import ProjectLinks from "../components/coin/project-links/project-links";
import Footer from "../components/others/footer/footer";
import "./coin-page.css";

function CoinPage() {
  const [coinData, setCoinData] = useState({});
  const [marketData, setMarketData] = useState({});
  const [currencyRates, setCurrencyRates] = useState({});
  const [priceChangesData, setPriceChangesData] = useState({});
  const [totalMarketCap, setTotalMarketCap] = useState({});
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  const scrollRef = useRef(null);

  // Data sent from App.js and table-data.js
  const location = useLocation();
  let coinID = null;
  let coinName = null;
  let coinSymbol = null;
  // IMPORTANT BUG I HAD TO SOLVE:
  // Need these ref values because changing value of global variables (not
  // states) inside a useEffect does nothing (change is ignored outside
  // useEffect). For first render, we will have null for coinNameRef and
  // coinSymbolRef (tested it). For second render, we will have proper values. I
  // could have made another API call inside coin-balance for coinSymbol for
  // example, but more API calls is bad idea.
  const coinNameRef = useRef(null);
  const coinSymbolRef = useRef(null);
  if (location.state) ({ coinID, coinName, coinSymbol } = location.state);
  if (!location.state) {
    coinID = location.pathname.split("/coins/")[1];
  }

  const navigate = useNavigate();
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
    fetchTotalMarketCap();
  }, [coinID, coinNameRef.current, coinSymbolRef.current, currencyName]);

  async function fetchCoinData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}`
      );
      console.log("coin_data", response.data);
      const market_data = response.data.market_data;
      setMarketData(market_data);
      if (!location.state) {
        coinNameRef.current = response.data.name;
        coinSymbolRef.current = response.data.symbol;
      }
      //##########################################################
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
      setCoinData(temp1);

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
      // history.push('/404');
      // const { response } = err.response.data;
      // if (response.statusText === 404) {
      //   Navigate("/errorpage");
      // console.log(err.response.status);
      // if (err.response.status === 404) {
      //   window.location.href = `/error-404`;
      //   // navigate("/path", { replace: true });
      //   return;
      // }
    }
  }

  async function fetchTotalMarketCap() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      setTotalMarketCap(response.data.data.total_market_cap[currencyName]);
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
          <MarketInfo
            coinData={coinData}
            coinID={coinID}
            marketData={marketData}
            totalMarketCap={totalMarketCap}
            currencyName={currencyName}
            currencySymbol={currencySymbol}
          ></MarketInfo>
          <CoinBalance
            scrollRef={scrollRef}
            coinSymbol={coinSymbol ? coinSymbol : coinSymbolRef.current}
            currencyName={currencyName}
            currencySymbol={currencySymbol}
            currencyRate={currencyRates[currencyName]}
            price_change_24h={priceChangesData.price_change_24h}
          ></CoinBalance>
          <CoinCharts
            coinID={coinID}
            coinName={coinName ? coinName : coinNameRef.current}
            currencyName={currencyName}
            currencySymbol={currencySymbol}
            priceChangesData={priceChangesData}
          />
          <Swapper
            ref={scrollRef}
            coinSymbol={coinSymbol ? coinSymbol : coinSymbolRef.current}
            currencyName={currencyName}
            currencySymbol={currencySymbol}
            currencyRates={currencyRates}
          ></Swapper>
          <CoinDescription coinData={coinData}></CoinDescription>
          <ProjectLinks coinData={coinData}></ProjectLinks>
        </div>
        <Footer />
      </div>
    </favoritesContext.Provider>
  );
}

export default CoinPage;

// MAYBE HAVE COINID BE CHECKED BEFORE ARRIVING AT COIN-PAGE TO PREVENT
// EMPTY PAGE FROM SHOWING
