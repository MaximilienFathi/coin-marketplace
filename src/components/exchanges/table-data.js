import React from "react";

function TableData({
  rank,
  image,
  name,
  trust_score,
  trade_volume_24h_normalized,
  trade_volume_24h,
  year_established,
  country,
}) {
  const transformData = function (data, fractionDigits = 0) {
    const numberFormatter = Intl.NumberFormat("en-US");
    return numberFormatter.format(Number(data).toFixed(fractionDigits));
    // Added Number() else issue with scientific notation
  };

  return (
    <div className="table-row">
      <p className={`exchange-rank`}>{rank}</p>
      <div>
        <img
          className="exchange-logo"
          src={image}
          alt="logo of the exchange platform"
        ></img>
        <p className="exchange-name">{name}</p>
      </div>
      <p className="exchange-trust-score">{trust_score || "N/A"}</p>
      <p className="exchange-volume-normalized">
        ${transformData(trade_volume_24h_normalized, 2)}
      </p>
      <p className="exchange-volume">${transformData(trade_volume_24h, 2)}</p>
      <p className="exchange-year">{year_established || "N/A"}</p>
      <p className="exchange-country">{country || "N/A"}</p>
    </div>
  );
}

export default TableData;
