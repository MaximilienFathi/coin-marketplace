import React, { useState } from "react";
import Favorite from "./favorite";

function TableData({
  rank,
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  total_volume,
  market_cap,
}) {
  const [favorite, setFavorite] = useState(
    localStorage.getItem(`coin ${rank}`) ? true : false
  );

  const color = current_price > 0 ? "green" : "red";

  const transformData = function (data, fractionDigits = 0) {
    const numberFormatter = Intl.NumberFormat("en-US");
    return numberFormatter.format(Number(data).toFixed(fractionDigits));
    // Added Number() else issue with scientific notation
  };

  // Maybe change number of decimal places for each value
  return (
    <div className="table-row">
      <Favorite
        favorite={favorite}
        setFavorite={setFavorite}
        rank={rank}
      ></Favorite>
      <p className={`coin-rank`}>{rank}</p>
      <div>
        <img
          className="coin-logo"
          src={image}
          alt="logo of the cryptocurrency"
        ></img>
        <p className="coin-name">{name}</p>
        <p className="coin-symbol">{symbol}</p>
      </div>
      <p className="coin-price">${transformData(current_price, 2)}</p>
      <p className={`coin-price-change ${color}`}>
        {transformData(price_change_percentage_1h_in_currency, 2)}%
      </p>
      <p className={`coin-price-change ${color}`}>
        {transformData(price_change_percentage_24h_in_currency, 2)}%
      </p>
      <p className={`coin-price-change ${color}`}>
        {transformData(price_change_percentage_7d_in_currency, 2)}%
      </p>
      <p className="coin-volume">${transformData(total_volume)}</p>
      <p className="coin-market-cap">${transformData(market_cap)}</p>
    </div>
  );
}

export default TableData;
