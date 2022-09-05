import React, { useContext } from "react";
import currencyContext from "../../contexts/currency-context";
import TrustScore from "../others/trust-score";
import "../coins/table-data.css";

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
  const [, , currencySymbol] = useContext(currencyContext);

  const transformData = function (data, fractionDigits = 2) {
    const num = data.toString().split(".")[0];

    if (num.length >= 6) fractionDigits = 0;

    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  return (
    <tr className="exchanges-table-row">
      <td className="exchange-rank">
        {trust_score_rank < Infinity ? trust_score_rank : "-"}
      </td>
      <td className="exchange-name-td">
        <img
          className="exchange-logo"
          src={image}
          alt={`logo of ${name}`}
        ></img>
        <p className="exchange-name">{name}</p>
      </td>
      <TrustScore trust_score={trust_score}></TrustScore>
      <td className="exchange-volume-normalized">
        {currencySymbol}
        {transformData(trade_volume_24h_normalized)}
      </td>
      <td className="exchange-volume">
        {currencySymbol}
        {transformData(trade_volume_24h)}
      </td>
      <td className="exchange-year">
        {year_established < Infinity ? year_established : "N/A"}
      </td>
      <td className="exchange-country">{country !== "~" ? country : "N/A"}</td>
    </tr>
  );
}

export default TableData;
