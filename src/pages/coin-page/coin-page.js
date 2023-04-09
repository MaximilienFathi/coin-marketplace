import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

import currencyContext from "../../contexts/currency-context";
import Header from "../../components/others/header/header";
import TopSection from "../../components/others/top-section/top-section";
import MarketInfo from "../../components/coin/market-info/market-info";
import CoinBalance from "../../components/coin/coin-balance/coin-balance";
import CoinCharts from "../../components/coin/coin-charts/coin-charts";
import Swapper from "../../components/coin/swapper/swapper";
import CoinDescription from "../../components/coin/coin-description/coin-description";
import ProjectLinks from "../../components/coin/project-links/project-links";
import Footer from "../../components/others/footer/footer";
import "./coin-page.css";

//############################################################################

export default function CoinPage() {
  const [currencyName] = useContext(currencyContext);

  const [coinData, setCoinData] = useState({});
  const [marketData, setMarketData] = useState({});
  const [currencyRates, setCurrencyRates] = useState({});
  const [priceChangesData, setPriceChangesData] = useState({});

  //############################################################################

  // Enable scrolling to swapper when clicking swap button
  const scrollRef = useRef(null);
  // Store loaded data for specific coin when accessing its URL from App.js
  const loaderCoinData = useLoaderData();

  //############################################################################

  // Reset scrollbar to top when page is loaded.
  window.scrollTo(0, 0);

  // Fetch all relevant data for specific coin
  useEffect(() => {
    fetchMarketData();
    fetchCoinData();
    fetchPriceChanges();
  }, []);

  //############################################################################

  // Fetch coin specific market data
  function fetchMarketData() {
    const marketDataObject = loaderCoinData.data["market_data"];
    setMarketData(marketDataObject);
    setCurrencyRates(marketDataObject.current_price);
  }

  // Fetch coin specific NON market data
  function fetchCoinData() {
    const coinDataObject = {};
    coinDataObject.id = loaderCoinData.data.id;
    coinDataObject.image = loaderCoinData.data.image.small;
    coinDataObject.name = loaderCoinData.data.name;
    coinDataObject.symbol = loaderCoinData.data.symbol;
    coinDataObject.rank = loaderCoinData.data.market_cap_rank;
    coinDataObject.homepage = loaderCoinData.data.links.homepage;
    coinDataObject.explorers = loaderCoinData.data.links.blockchain_site;
    coinDataObject.community = {};
    coinDataObject.community = addCommunityLink(
      coinDataObject.community,
      "Facebook",
      "https://facebook.com/",
      loaderCoinData.data.links.facebook_username
    );
    coinDataObject.community = addCommunityLink(
      coinDataObject.community,
      "Reddit",
      "",
      loaderCoinData.data.links.subreddit_url
    );
    coinDataObject.community = addCommunityLink(
      coinDataObject.community,
      "Telegram",
      "https://t.me/",
      loaderCoinData.data.links.telegram_channel_identifier
    );
    coinDataObject.community = addCommunityLink(
      coinDataObject.community,
      "Twitter",
      "https://twitter.com/",
      loaderCoinData.data.links.twitter_screen_name
    );
    coinDataObject.code = loaderCoinData.data.links.repos_url.github[0];
    coinDataObject.contractAddress = loaderCoinData.data.contract_address;
    coinDataObject.description = loaderCoinData.data.description.en;
    setCoinData(coinDataObject);
  }

  // Fetch coin specific price changes over time
  function fetchPriceChanges() {
    const marketDataObject = loaderCoinData.data["market_data"];
    const priceChangesObject = {};
    priceChangesObject.price_change_1h =
      marketDataObject.price_change_percentage_1h_in_currency[currencyName];
    priceChangesObject.price_change_24h =
      marketDataObject.price_change_percentage_24h_in_currency[currencyName];
    priceChangesObject.price_change_7d =
      marketDataObject.price_change_percentage_7d_in_currency[currencyName];
    priceChangesObject.price_change_14d =
      marketDataObject.price_change_percentage_14d_in_currency[currencyName];
    priceChangesObject.price_change_30d =
      marketDataObject.price_change_percentage_30d_in_currency[currencyName];
    priceChangesObject.price_change_1y =
      marketDataObject.price_change_percentage_1y_in_currency[currencyName];
    setPriceChangesData(priceChangesObject);
  }

  // Return URL for specific community in a specific social network
  function addCommunityLink(communityLinks, siteName, domain, identifier) {
    if (identifier) communityLinks[siteName] = domain + identifier;
    return communityLinks;
  }

  //############################################################################

  return (
    <div className="coin-page-container">
      <Header />
      <div className="content-wrap">
        <TopSection
          heading={
            <h1 className="top-section-heading">
              <span>{coinData.name}</span> Performance and Stats at a Glance
            </h1>
          }
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Asperiores aspernatur blanditiis eaque earum fugit" +
            " incidunt nobis ipsum dolor sit amet adipisicing elit amet" +
            " animi assumenda."
          }
        />
        <div className="coin-page-content-wrap">
          <MarketInfo coinData={coinData} marketData={marketData}></MarketInfo>
          {/*{coinData && marketData ? (*/}
          {/*    <MarketInfo coinData={coinData} marketData={marketData} />*/}
          {/*) : null}*/}
          <CoinBalance
            coinSymbol={coinData.symbol}
            currencyRate={currencyRates[currencyName]}
            price_change_24h={priceChangesData.price_change_24h}
            scrollRef={scrollRef}
          ></CoinBalance>
          <CoinCharts
            coinID={coinData.id}
            coinName={coinData.name}
            priceChangesData={priceChangesData}
          />
          <Swapper
            coinSymbol={coinData.symbol}
            currencyRates={currencyRates}
            ref={scrollRef}
          ></Swapper>
          <CoinDescription coinData={coinData}></CoinDescription>
          <ProjectLinks coinData={coinData}></ProjectLinks>
        </div>
        <Footer />
      </div>
    </div>
  );
}
