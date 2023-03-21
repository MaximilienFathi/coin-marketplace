import React from "react";

import "./price-progress-bar.css";

//############################################################################

export default function PriceProgressBar({
  marketData,
  currencyName,
  currencySymbol,
}) {
  // Set current price and lowest/highest price reached in last 24h
  const currentPrice =
    marketData.current_price && marketData.current_price[currencyName];
  const lowPrice24h = marketData.low_24h && marketData.low_24h[currencyName];
  let highPrice24h = marketData.high_24h && marketData.high_24h[currencyName];
  // Following is added as in rare cases currentPrice is higher than
  // highPrice24h (API not yet updated) making progress bar too long
  highPrice24h = currentPrice > highPrice24h ? currentPrice : highPrice24h;
  const widthPercentage =
    (100 * (currentPrice - lowPrice24h)) / (highPrice24h - lowPrice24h);

  // Set styles for price "front" bar
  const priceFrontBarStyles = {
    height: "100%",
    width: `${widthPercentage}%`,
    background: "linear-gradient(90deg, brown, gold)",
    borderRadius: "50px",
  };

  // Display low/high price label under progress bar
  function displayPriceLabel(priceValue) {
    return (
      <p className="progress-bar-label">
        {currencySymbol}
        {priceValue &&
          priceValue.toLocaleString("en-US", {
            maximumFractionDigits: 8,
          })}
      </p>
    );
  }

  //############################################################################

  return (
    <div className="price-progress-bar-container">
      <div className="price-back-bar">
        <div className="price-front-bar" style={priceFrontBarStyles}></div>
      </div>
      <div className="progress-bar-labels-container">
        {displayPriceLabel(lowPrice24h)}
        <p className="progress-bar-label">24H Range</p>
        {displayPriceLabel(highPrice24h)}
      </div>
    </div>
  );
}
