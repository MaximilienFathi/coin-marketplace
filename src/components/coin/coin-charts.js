import React, { useEffect, useState } from "react";
import axios from "axios";

function CoinCharts(props) {
  const [historicData, setHistoricData] = useState([]);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [timeframe, setTimeframe] = useState(1);
  // const [loading, setLoading] = useState(false);

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
    // Currency data
    if (localStorage.getItem("currency")) {
      setCurrencyName(JSON.parse(localStorage.getItem("currency"))["name"]);
      setCurrencySymbol(JSON.parse(localStorage.getItem("currency"))["symbol"]);
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem(
        "currency",
        JSON.stringify({ name: currencyName, symbol: currencySymbol })
      );
    }
  }, [currencyName]);

  // Fetch historical data for a specific coin
  useEffect(() => {
    (async function fetchData() {
      try {
        // const response = await axios.get(
        //   `https://api.coingecko.com/api/v3/coins/${coin.item.id}/market_chart?vs_currency=${currencyName}&days=${timeframe}`
        // );
        // setHistoricData(response);
        // console.log("result 1", response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [timeframe]);

  return (
    <div>
      <div className="buttons-group">
        <button>Price</button>
        <button>Market Cap</button>
        <button>Total Volume</button>
      </div>
      <div className="chart-area">
        <div className="chart-area-price-data">
          <p className="chart-area-price-value">
            {/*{currencySymbol}*/}
            {/*{current_price}*/}
          </p>
          {/*<p className={`chart-area-price-change ${price_change_color}`}>*/}
          {/*  {transformData(price_change, 0, "percentage")}%*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  );
}

export default CoinCharts;
