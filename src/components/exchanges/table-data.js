import React from "react";

function TableData({
  trust_score_rank,
  image,
  name,
  trust_score,
  trade_volume_24h_normalized,
  trade_volume_24h,
  year_established,
  country,
}) {
  const transformData = function (data, fractionDigits = 2) {
    const num = data.toString().split(".")[0];

    if (num.length >= 6) fractionDigits = 0;

    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  return (
    <div className="table-row">
      <p className={`exchange-rank`}>
        {trust_score_rank < Infinity ? trust_score_rank : "-"}
      </p>
      <div>
        <img
          className="exchange-logo"
          src={image}
          alt={`logo of ${name}`}
        ></img>
        <p className="exchange-name">{name}</p>
      </div>
      <p className="exchange-trust-score">{trust_score || "N/A"}</p>
      <p className="exchange-volume-normalized">
        ${transformData(trade_volume_24h_normalized)}
      </p>
      <p className="exchange-volume">${transformData(trade_volume_24h)}</p>
      <p className="exchange-year">
        {year_established < Infinity ? year_established : "N/A"}
      </p>
      <p className="exchange-country">{country !== "~" ? country : "N/A"}</p>
    </div>
  );
}

export default TableData;
