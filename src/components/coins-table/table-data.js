import React, { useContext } from "react";
import { Link } from "react-router-dom";

import currencyContext from "../../contexts/currency-context";
import Favorite from "../others/favorite";
import "./table-data.css";

//############################################################################

function TableData({
  id,
  market_cap_rank,
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
  const [, , currencySymbol] = useContext(currencyContext);

  const price_change_1h_color =
    price_change_percentage_1h_in_currency >= 0 ? "green" : "red";
  const price_change_24h_color =
    price_change_percentage_24h_in_currency >= 0 ? "green" : "red";
  const price_change_7d_color =
    price_change_percentage_7d_in_currency >= 0 ? "green" : "red";

  // Display data with specific number of decimal places based on its type.
  function transformData(data, fractionDigits, type) {
    const num1 = data.toString().split(".")[0];
    const num2 = data.toString().split(".")[1] || 0;

    if (type === "price" && data < 1 && data != 0) fractionDigits = num2.length;
    if ((type === "volume" || type === "market_cap") && num1.length > 2) {
      fractionDigits = 0;
    }
    if (
      (type === "volume" || type === "market_cap") &&
      num1 == 0 &&
      num2 != 0
    ) {
      fractionDigits = num2.length;
    }

    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }

  //############################################################################

  return (
    <tr className="coins-table-row">
      <td>
        <Favorite coinID={id}></Favorite>
      </td>
      <td className="coin-rank">
        {market_cap_rank < Infinity ? market_cap_rank : "-"}
      </td>
      <td className="coin-name-td">
        <img className="coin-logo" src={image} alt={`logo of ${name}`}></img>
        <Link
          className="header-nav-link"
          to={`${process.env.PUBLIC_URL}/coins/${id}`}
        >
          <p className="coin-name">{name}</p>
        </Link>
        <p className="coin-symbol">{symbol.toUpperCase()}</p>
      </td>
      <td className="coin-price">
        {currencySymbol}
        {transformData(current_price, 2, "price")}
      </td>
      <td className={`coin-price-change ${price_change_1h_color}`}>
        {transformData(price_change_percentage_1h_in_currency, 1)}%
      </td>
      <td className={`coin-price-change ${price_change_24h_color}`}>
        {transformData(price_change_percentage_24h_in_currency, 1)}%
      </td>
      <td className={`coin-price-change ${price_change_7d_color}`}>
        {transformData(price_change_percentage_7d_in_currency, 1)}%
      </td>
      <td className="coin-volume">
        {currencySymbol}
        {transformData(total_volume, 1, "volume")}
      </td>
      <td className="coin-market-cap">
        {currencySymbol}
        {transformData(market_cap, 1, "market_cap")}
      </td>
    </tr>
  );
}

export default TableData;
