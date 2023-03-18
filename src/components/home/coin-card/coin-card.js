import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../others/line-chart";
import "./coin-card.css";

function CoinCard({
  id,
  name,
  symbol,
  logo,
  current_price,
  currencyName,
  currencySymbol,
  price_change,
  historicData,
}) {
  const price_change_color = price_change >= 0 ? "green" : "red";

  // Contrary to table data, not transforming price as it is already fine
  const transformData = function (data, fractionDigits, type) {
    if (type === "percentage") {
      fractionDigits = 2;
    }
    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  return (
    <Link
      to={`${process.env.PUBLIC_URL}/coins/${id}`}
      state={{
        coinID: id,
        coinName: name,
        coinSymbol: symbol,
      }}
      className="header-nav-link"
    >
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
                <p className="coin-card-symbol">
                  {symbol}/{currencyName.toUpperCase()}
                </p>
                <div className="coin-card-price-data">
                  <p className="coin-card-price">
                    {currencySymbol}
                    {current_price}
                  </p>
                  <p className={`coin-card-change ${price_change_color}`}>
                    {transformData(price_change, 0, "percentage")}%
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
    </Link>
  );
}

export default CoinCard;
