import React, { useContext } from "react";

import currencyContext from "../../contexts/currency-context";
import TrustScore from "../others/trust-score/trust-score";
import "../coins-table/table-data.css";

//############################################################################

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

  // Display data with specific number of decimal places based on its length.
  const transformData = function (data, fractionDigits) {
    const num = data.toString().split(".")[0];

    if (num.length >= 6) fractionDigits = 0;

    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  //############################################################################

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
        {transformData(trade_volume_24h_normalized, 2)}
      </td>
      <td className="exchange-volume">
        {currencySymbol}
        {transformData(trade_volume_24h, 2)}
      </td>
      <td className="exchange-year">
        {year_established < Infinity ? year_established : "-"}
      </td>
      <td className="exchange-country">{country !== "~" ? country : "-"}</td>
    </tr>
  );
}

export default TableData;
