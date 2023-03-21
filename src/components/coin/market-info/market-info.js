import React, { useState } from "react";

import Favorite from "../../others/favorite";
import PriceProgressBar from "../price-progress-bar/price-progress-bar";
import "./market-info.css";

//############################################################################

export default function MarketInfo({
  coinData,
  marketData,
  totalMarketCap,
  currencyName,
  currencySymbol,
}) {
  // Show if coin is in localStorage favorites array or not (boolean value)
  // TODO: LESSON LEARNT (UPDATE - IGNORED BECAUSE BUGS OUT FAVORITES SYSTEM)
  // https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react
  // https://legacy.reactjs.org/docs/hooks-reference.html#lazy-initial-state
  // TODO: LESSON LEARNT
  // Had to add ?. because otherwise it was not null safe!
  const [favorite, setFavorite] = useState(
    // FIXME
    // console.log(
    //   "dsada",
    //   coinData,
    //   marketData,
    //   totalMarketCap,
    //   currencyName,
    //   currencySymbol
    // );
    // FIXME
    // console.log(
    //   "gfg",
    //   JSON.parse(localStorage.getItem("favorites"))?.includes(coinData.id)
    // );
    JSON.parse(localStorage.getItem("favorites"))?.includes(coinData.id)
  );

  //############################################################################

  // Return certain passed data rounded up to 8 decimal places
  function displayValue(data) {
    if (
      data === "circulating_supply" ||
      data === "total_supply" ||
      data === "max_supply"
    )
      return marketData[data] ? marketData[data].toLocaleString("en-US") : "-";

    const value = marketData[data] && marketData[data][currencyName];
    return value
      ? `${currencySymbol}${value.toLocaleString("en-US", {
          maximumFractionDigits: 8,
        })}`
      : "-";
  }

  // Return passed data (% change) rounded to 2 decimal places
  function displayPercentage(data) {
    const value = marketData[data] && marketData[data][currencyName];
    return value
      ? `${value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%`
      : "";
  }

  // Return a percentage showing how dominant a currency is in the market
  function findMarketDominance() {
    const marketCap =
      marketData["market_cap"] && marketData["market_cap"][currencyName];
    const marketDominance = (marketCap / totalMarketCap) * 100;
    return marketDominance
      ? `${marketDominance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%`
      : "-";
  }

  // Have values >= 0 be in green displays, values < 0 in red displays
  function findColor(data) {
    const value = marketData[data] && marketData[data][currencyName];
    return value >= 0 ? "green-box" : "red-box";
  }

  //############################################################################

  return (
    <div className="market-info-outer-container">
      <div className="market-info-top-section">
        <img
          className="market-info-logo"
          src={coinData.image}
          alt={`logo of ${coinData.name}`}
        ></img>
        <div className="market-info-name-container">
          <p className="market-info-name">{coinData.name}</p>
          <p className="market-info-symbol">({coinData.symbol})</p>
          <Favorite
            favorite={favorite}
            setFavorite={setFavorite}
            coinID={coinData.id}
          ></Favorite>
        </div>
        <div className="market-info-rank-container">
          <p className="market-info-rank small-box">
            {coinData.rank ? `Rank #${coinData.rank}` : `Unranked`}
          </p>
        </div>
        <div className="market-info-price-container">
          <p className="market-info-price-value">
            {displayValue("current_price")}
          </p>
          <p
            className={`market-info-price-change ${findColor(
              "price_change_percentage_24h_in_currency"
            )}`}
          >
            {displayPercentage("price_change_percentage_24h_in_currency")}
          </p>
        </div>
        <PriceProgressBar
          marketData={marketData}
          currencyName={currencyName}
          currencySymbol={currencySymbol}
        ></PriceProgressBar>
      </div>

      <div className="market-info-grid">
        <div className="market-info-item">
          <p className="market-info-label">All Time High</p>
          <div className="market-info-value-container">
            <p
              className={`market-info-value-change ${findColor(
                "ath_change_percentage"
              )}`}
            >
              {displayPercentage("ath_change_percentage")}
            </p>
            <p className="market-info-value">{displayValue("ath")}</p>
          </div>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">All Time Low</p>
          <div className="market-info-value-container">
            <p
              className={`market-info-value-change ${findColor(
                "atl_change_percentage"
              )}`}
            >
              {displayPercentage("atl_change_percentage")}
            </p>
            <p className="market-info-value">{displayValue("atl")}</p>
          </div>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Total Volume</p>
          <p className="market-info-value">{displayValue("total_volume")}</p>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Market Cap</p>
          <div className="market-info-value-container">
            <p
              className={`market-info-value-change ${findColor(
                "market_cap_change_percentage_24h_in_currency"
              )}`}
            >
              {displayPercentage(
                "market_cap_change_percentage_24h_in_currency"
              )}
            </p>
            <p className="market-info-value">{displayValue("market_cap")}</p>
          </div>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Diluted Market Cap</p>
          <p className="market-info-value">
            {displayValue("fully_diluted_valuation")}
          </p>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Market Dominance</p>
          <p className="market-info-value">{findMarketDominance()}</p>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Circulating Supply</p>
          <p className="market-info-value">
            {displayValue("circulating_supply")}
          </p>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Total Supply</p>
          <p className="market-info-value">{displayValue("total_supply")}</p>
        </div>

        <div className="market-info-item">
          <p className="market-info-label">Max Supply</p>
          <p className="market-info-value">{displayValue("max_supply")}</p>
        </div>
      </div>
    </div>
  );
}
