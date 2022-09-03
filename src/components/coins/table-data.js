import React, { useContext, useEffect, useState } from "react";
import Favorite from "../others/favorite";
import LineChart from "../others/line-chart";
import axios from "axios";
import currencyContext from "../../contexts/currency-context";
import "./table-data.css";

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
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")).includes(id)
  );
  const [, , currencySymbol] = useContext(currencyContext);
  // const [historicData, setHistoricData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
  //     )
  //     .then((res) => {
  //       setHistoricData(res.data.prices);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]); // not sure if I must include id

  const color = current_price >= 0 ? "green" : "red";

  const transformData = function (data, fractionDigits, type) {
    // if (type) console.log(type, data);
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
  };

  return (
    <tr className="table-row">
      <Favorite
        favorite={favorite}
        setFavorite={setFavorite}
        id={id}
      ></Favorite>
      <td className="coin-rank">
        {market_cap_rank < Infinity ? market_cap_rank : "-"}
      </td>
      <td className="coin-name-td">
        <img className="coin-logo" src={image} alt={`logo of ${name}`}></img>
        <p className="coin-name">{name}</p>
        <p className="coin-symbol">{symbol}</p>
      </td>
      <td className="coin-price">
        {currencySymbol}
        {transformData(current_price, 2, "price")}
      </td>
      <td className={`coin-price-change ${color}`}>
        {transformData(price_change_percentage_1h_in_currency, 1)}%
      </td>
      <td className={`coin-price-change ${color}`}>
        {transformData(price_change_percentage_24h_in_currency, 1)}%
      </td>
      <td className={`coin-price-change ${color}`}>
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
      {/*<LineChart historicData={historicData}></LineChart>*/}
    </tr>
  );
}

export default TableData;
