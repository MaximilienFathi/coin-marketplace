import React from "react";
import "./coin-balance.css";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

function CoinBalance({ coinSymbol, currencySymbol, currencyName }) {
  const data = {
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["rgb(52,151,149)", "rgba(52,151,149,0.3)"],
        display: true,
        borderWidth: 2,
        borderColor: "#64efdf",
      },
    ],
  };

  return (
    <div className="coin-balance-outer-container">
      <div className="coin-balance-top-section"></div>
      <div className="coin-balance-inner-container">
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            rotation: -90,
            circumference: 180,
            cutout: "90%",
            // animation: {
            //   duration: 1000,
            //   animateRotate: true,
            //   easing: "easeInOutCirc",
            // },
            maintainAspectRatio: true,
            responsive: true,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div>
            <p>{coinSymbol.toUpperCase()} balance</p>
            <p>{currencySymbol}453.65</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinBalance;
