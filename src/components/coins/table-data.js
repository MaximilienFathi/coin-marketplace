import React, { useEffect, useState } from "react";
import Favorite from "../others/favorite";
import LineChart from "../others/line-chart";
import axios from "axios";

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
  const [favorite, setFavorite] = useState(localStorage.getItem(id));
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

  const color = current_price > 0 ? "green" : "red";

  const transformData = function (data, fractionDigits, type) {
    // // const num1 = Number(data.toString().split(".")[0]);
    // const num = data.toString().split(".")[1] || 0;
    // if (type === "price") fractionDigits = num.length;
    //
    // const numberFormatter = Intl.NumberFormat("en-US");
    // return numberFormatter.format(Number(data).toFixed(fractionDigits));
    // // Added Number() else issue with scientific notation

    const num1 = data.toString().split(".")[0];
    const num2 = data.toString().split(".")[1] || 0;

    if (type === "price") fractionDigits = num2.length;
    if ((type === "volume" || type === "market_cap") && num1.length > 2) {
      fractionDigits = 0;
    }

    return data.toLocaleString("en-US", {
      maximumFractionDigits: fractionDigits,
    });
  };

  // Maybe change number of decimal places for each value
  return (
    <div className="table-row">
      <Favorite
        favorite={favorite}
        setFavorite={setFavorite}
        id={id}
        rank={market_cap_rank}
      ></Favorite>
      <p className={`coin-rank`}>{market_cap_rank || "-"}</p>
      <div>
        <img
          className="coin-logo"
          src={image}
          alt="logo of the cryptocurrency"
        ></img>
        <p className="coin-name">{name}</p>
        <p className="coin-symbol">{symbol}</p>
      </div>
      <p className="coin-price">
        ${current_price ? transformData(current_price, 2, "price") : 0}
      </p>
      <p className={`coin-price-change ${color}`}>
        {price_change_percentage_1h_in_currency
          ? transformData(price_change_percentage_1h_in_currency, 2)
          : 0}
        %
      </p>
      <p className={`coin-price-change ${color}`}>
        {price_change_percentage_24h_in_currency
          ? transformData(price_change_percentage_24h_in_currency, 2)
          : 0}
        %
      </p>
      <p className={`coin-price-change ${color}`}>
        {price_change_percentage_7d_in_currency
          ? transformData(price_change_percentage_7d_in_currency, 2)
          : 0}
        %
      </p>
      <p className="coin-volume">
        ${total_volume ? transformData(total_volume, 1, "volume") : 0.0}
      </p>
      <p className="coin-market-cap">
        ${market_cap ? transformData(market_cap, 1, "market_cap") : 0.0}
      </p>
      {/*<LineChart historicData={historicData}></LineChart>*/}
    </div>
  );
}

export default TableData;
