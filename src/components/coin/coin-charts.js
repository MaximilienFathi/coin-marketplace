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
import CoinDataTabs from "./coin-data-tabs";
import TimeframeTabs from "./timeframe-tabs";
import "./coin-charts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

function CoinCharts({ coinID, coinName }) {
  const [historicData, setHistoricData] = useState([]);
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [datatype, setDatatype] = useState("prices");
  const [timeframe, setTimeframe] = useState(1);
  // const [loading, setLoading] = useState(false);

  const labels = {
    prices: "Prices",
    market_caps: "Market Caps",
    total_volumes: "Total Volumes",
  };
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
  }, [currencyName]);

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
  const options = {
    scales: {
      x: {
        ticks: { padding: 10, color: "rgba(255,255,255,0.4)" },
        grid: {
          display: false,
          drawBorder: true,
          borderColor: "rgba(255, 255, 255, 0.6)",
          borderWidth: 2,
          tickBorderDashOffset: 50,
        },
      },
      y: {
        ticks: { padding: 10, color: "rgba(255,255,255,0.4)" },
        grid: {
          drawBorder: false,
          borderDash: [3, 3],
          // borderDashOffset: 2,
          drawTicks: false,
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
    // layout: { padding: { left: 100, bottom: 50 } },
    responsive: true,
    // maintainAspectRatio: false,
  };
  const data = {
    labels: historicData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            } PM`
          : `${date.getHours()}:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            } AM`;
      return timeframe == 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: historicData.map((coin) => coin[1]),
        label: `${currencyName.toUpperCase()}`,
        pointRadius: 0.5,
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
          const gradient = ctx.createLinearGradient(0, 130, 0, 330);
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
      <CoinDataTabs fetchData={fetchData} timeframe={timeframe} />
      <div className="coin-charts-inner-container">
        <div className="coin-charts-price-data">
          <p className="coin-charts-heading">
            {coinName} {labels[datatype]} Chart ({currencyName.toUpperCase()})
          </p>
          <TimeframeTabs fetchData={fetchData} datatype={datatype} />
          {/*<p className="coin-charts-price-value">*/}
          {/*{currencySymbol}*/}
          {/*{current_price}*/}
          {/*</p>*/}
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
