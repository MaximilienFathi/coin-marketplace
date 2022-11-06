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
import CoinDataTabs from "../coin-data-tabs/coin-data-tabs";
import TimeframeTabs from "../timeframe-tabs/timeframe-tabs";
import PriceChanges from "../price-changes/price-changes";
import "./coin-charts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

function CoinCharts({
  coinID,
  coinName,
  currencyName,
  currencySymbol,
  priceChangesData,
}) {
  const [historicData, setHistoricData] = useState([]);
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
  // Fetch chart data for a specific coin
  useEffect(() => {
    fetchChartData("prices", 1);
  }, [coinID, currencyName]);

  // Fetch chart data based on chosen data type (prices, market cap, volume)
  async function fetchChartData(newDataType, newTimeframe) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currencyName}&days=${newTimeframe}`
      );
      setHistoricData(response.data[newDataType]);
      setDatatype(newDataType);
      setTimeframe(newTimeframe);
      console.log("coin_charts_stuff", response);
    } catch (err) {
      console.error(err);
    }
  }
  //****************************************************************************
  //****************************************************************************
  const options = {
    locale: "en-US",
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
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
        ticks: {
          padding: 10,
          color: "rgba(255,255,255,0.4)",
          // callback: function (value, index, ticks) {
          //   return new Intl.NumberFormat("en-US", {
          //     style: "currency",
          //     currency: "usd",
          //   }).format(value);
          // },
        },
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
  // https://stackoverflow.com/questions/72998998/how-to-make-vertical-line-when-hovering-cursor-chart-js
  const plugins = [
    {
      afterDraw: (chart) => {
        if (chart.tooltip?._active?.length) {
          let x = chart.tooltip._active[0].element.x;
          let yAxis = chart.scales.y;
          let ctx = chart.ctx;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.moveTo(x, yAxis.top);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(255,255,255,0.4)";
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];
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
        label: ` ${currencyName.toUpperCase()}`,
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
      <CoinDataTabs fetchChartData={fetchChartData} timeframe={timeframe} />
      <div className="coin-charts-inner-container">
        <div className="coin-charts-price-data">
          <p className="coin-charts-heading">
            {coinName} {labels[datatype]} Chart ({currencyName.toUpperCase()})
          </p>
          <TimeframeTabs fetchChartData={fetchChartData} datatype={datatype} />
        </div>
        <Line data={data} plugins={plugins} options={options} />
      </div>
      <PriceChanges priceChangesData={priceChangesData}></PriceChanges>
    </div>
  );
}

export default CoinCharts;
