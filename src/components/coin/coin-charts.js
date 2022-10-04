import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./coin-charts.css";
import CoinDataTabs from "./coin-data-tabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

function CoinCharts({ coinID }) {
  const [historicData, setHistoricData] = useState([]);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [datatype, setDatatype] = useState("prices");
  const [timeframe, setTimeframe] = useState(1);
  // const [loading, setLoading] = useState(false);
  //****************************************************************************
  //****************************************************************************
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
    fetchData("prices", 1);
  }, []);

  // Fetch historic data based on chosen data type (prices, market cap,
  // total volume)
  async function fetchData(newDataType, newTimeframe) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currencyName}&days=${newTimeframe}`
      );
      console.log(newDataType, newTimeframe);
      setHistoricData(response.data[newDataType]);
      setDatatype(newDataType);
      setTimeframe(newTimeframe);
      console.log("result 1", response);
    } catch (err) {
      console.error(err);
    }
  }
  //****************************************************************************
  //****************************************************************************
  const labels = new Array(historicData.length);
  const options = {
    scales: {
      // x: {
      //   display: false,
      // },
      // y: {
      //   display: false,
      // },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Historic Data",
        data: historicData,
        pointRadius: 0,
        tension: 0.7,
        fill: {
          target: "origin", // 3. Set the fill options
          // above: "rgba(75, 192, 192, 0.25)",
        },
        borderColor: ["#64efdf"],
        borderWidth: 3,
        // borderColor: gradient2, // Add custom color border (Line)
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 170, 0, 300);
          gradient.addColorStop(1, "rgba(52,151,149,0)");
          gradient.addColorStop(0, "rgba(52,151,149,100)");
          return gradient;
        },
      },
    ],
  };
  //****************************************************************************
  //****************************************************************************
  return (
    <div className="coin-charts-outer-container">
      <CoinDataTabs
        fetchData={fetchData}
        datatype={datatype}
        timeframe={timeframe}
      />
      {/*<div className="datatype-buttons-group">*/}
      {/*  <button*/}
      {/*    className="datatype-button"*/}
      {/*    onClick={() => fetchData("prices", timeframe)}*/}
      {/*  >*/}
      {/*    Price*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className="datatype-button"*/}
      {/*    onClick={() => fetchData("market_caps", timeframe)}*/}
      {/*  >*/}
      {/*    Market Cap*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className="datatype-button"*/}
      {/*    onClick={() => fetchData("total_volumes", timeframe)}*/}
      {/*  >*/}
      {/*    Total Volume*/}
      {/*  </button>*/}
      {/*</div>*/}
      <div className="timeframe-buttons-group">
        <button onClick={() => fetchData(datatype, 1)}>1D</button>
        <button onClick={() => fetchData(datatype, 7)}>7D</button>
        <button onClick={() => fetchData(datatype, 30)}>1M</button>
        <button onClick={() => fetchData(datatype, 90)}>3M</button>
        <button onClick={() => fetchData(datatype, 365)}>1Y</button>
        <button onClick={() => fetchData(datatype, "max")}>All</button>
      </div>
      <div className="coin-charts-inner-container">
        <div className="coin-charts-price-data">
          <p className="coin-charts-price-value">
            {/*{currencySymbol}*/}
            {/*{current_price}*/}
          </p>
          {/*<p className={`chart-area-price-change ${price_change_color}`}>*/}
          {/*  {transformData(price_change, 0, "percentage")}%*/}
          {/*</p>*/}
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default CoinCharts;
