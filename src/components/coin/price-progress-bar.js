import React from "react";
import "./price-progress-bar.css";

function PriceProgressBar({ marketData, currencyName, currencySymbol }) {
  const currentPrice =
    marketData.current_price && marketData.current_price[currencyName];
  const lowPrice24h = marketData.low_24h && marketData.low_24h[currencyName];
  const highPrice24h = marketData.high_24h && marketData.high_24h[currencyName];
  const widthPercentage =
    (100 * (currentPrice - lowPrice24h)) / (highPrice24h - lowPrice24h);

  const priceFrontBarStyles = {
    height: "100%",
    width: `${widthPercentage}%`,
    background: "linear-gradient(90deg, brown, gold)",
    borderRadius: "50px",
  };

  return (
    <div className="price-progress-bar-container">
      <div className="price-back-bar">
        <div className="price-front-bar" style={priceFrontBarStyles}></div>
      </div>
      <div className="progress-bar-labels-container">
        <p className="progress-bar-label">
          {currencySymbol}
          {marketData.low_24h && marketData.low_24h[currencyName]}
        </p>
        <p className="progress-bar-label">24H Range</p>
        <p className="progress-bar-label">
          {currencySymbol}
          {marketData.high_24h && marketData.high_24h[currencyName]}
        </p>
      </div>
    </div>
  );
}

export default PriceProgressBar;
