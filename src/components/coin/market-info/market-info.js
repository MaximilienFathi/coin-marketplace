import React, { useState } from "react";
import Favorite from "../../others/favorite";
import "./market-info.css";

function MarketInfo({
  coinData,
  coinID,
  marketData,
  currencyName,
  currencySymbol,
}) {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")).includes(coinID)
  );
  // Using coinData.id instead of coinID does not work

  return (
    <div className="market-info-outer-container">
      <div className="market-info-top-section">
        <img
          className="market-info-logo"
          src={coinData.image}
          alt={`logo of ${coinData.name}`}
        ></img>
        <div className="market-info-identity-1">
          <p className="market-info-name">{coinData.name}</p>
          <Favorite
            favorite={favorite}
            setFavorite={setFavorite}
            id={coinID}
          ></Favorite>
        </div>
        <div className="market-info-identity-2">
          <p className="market-info-rank small-box">
            {coinData.rank ? `Rank #${coinData.rank}` : `Unranked`}
          </p>
          <p className="market-info-symbol small-box">{coinData.symbol}</p>
          <p className="market-info-type small-box">Coin</p>
        </div>
      </div>
      <div className="market-info-grid">
        <div className="market-info-item grid-position-1">
          <p className="market-info-label">Market Cap</p>
          <p className="market-info-value">
            {currencySymbol}
            {marketData.market_cap && marketData.market_cap[currencyName]}
          </p>
        </div>
        <div className="market-info-item grid-position-2">
          <p className="market-info-label">Diluted Market Cap</p>
          <p className="market-info-value">
            {currencySymbol}
            {marketData.fully_diluted_valuation &&
              marketData.fully_diluted_valuation[currencyName]}
          </p>
        </div>
        <div className="market-info-item grid-position-3">
          <p className="market-info-label">Market Dominance</p>
          {/*<p className="market-info-value">{marketData.}</p>*/}
        </div>
        <div className="market-info-item grid-position-4">
          <p className="market-info-label">Market Rank</p>
          <p className="market-info-value">{marketData.market_cap_rank}</p>
        </div>
        {/*<div className="market-info-item grid-position-5">*/}
        {/*  <p className="market-info-label">item 5</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-6">*/}
        {/*  <p className="market-info-label">item 6</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-7">*/}
        {/*  <p className="market-info-label">item 7</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-8">*/}
        {/*  <p className="market-info-label">item 8</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-9">*/}
        {/*  <p className="market-info-label">item 9</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-10">*/}
        {/*  <p className="market-info-label">item 10</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-11">*/}
        {/*  <p className="market-info-label">item 11</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
        {/*<div className="market-info-item grid-position-12">*/}
        {/*  <p className="market-info-label">item 12</p>*/}
        {/*  <p className="market-info-value">{marketData.market_cap_rank}</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default MarketInfo;
