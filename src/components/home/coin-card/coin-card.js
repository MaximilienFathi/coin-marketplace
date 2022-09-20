import React from "react";
import LineChart from "../../others/line-chart";
import "./coin-card.css";

function CoinCard({
  name,
  symbol,
  logo,
  current_price,
  price_change,
  historicData,
}) {
  const price_change_color = price_change >= 0 ? "green" : "red";

  return (
    <div className="coin-card">
      <div className="coin-card-text">
        <p className="coin-card-name">{name}</p>
        <div className="coin-card-data">
          <div>
            <img
              className="coin-card-logo"
              src={logo}
              alt={`logo of ${name}`}
            ></img>
            <div>
              <p className="coin-card-symbol">{symbol}/USD</p>
              <div className="coin-card-price-data">
                <p className="coin-card-price">${current_price}</p>
                <p className={`coin-card-change ${price_change_color}`}>
                  {price_change}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="coin-card-chart">
        <LineChart historicData={historicData}></LineChart>
      </div>
    </div>
  );
}

export default CoinCard;

// Must include price change (in past 24h?) (in USD or have it change?)
