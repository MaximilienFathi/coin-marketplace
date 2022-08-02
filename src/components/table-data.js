import React from "react";

function TableData({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
  total_volume,
  market_cap,
}) {
  const color = current_price > 0 ? "green" : "red";

  const transformData = function (data, fractionDigits = 0) {
    const numberFormatter = Intl.NumberFormat("en-US");
    return numberFormatter.format(Number(data).toFixed(fractionDigits));
    // Added Number() else issue with scientific notation
  };

  return (
    <div className="table-row">
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
        {transformData(price_change_percentage_24h, 2)}%
      </p>
      <p className="coin-volume">${transformData(total_volume)}</p>
      <p className="coin-market-cap">${transformData(market_cap)}</p>
    </div>
  );
}

export default TableData;
