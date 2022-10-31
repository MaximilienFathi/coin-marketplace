import React from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import "./coin-balance.css";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";

Chart.register(ArcElement);

//========================================================
// CUSTOM STYLES
const StyledButton = styled(Button)({
  "&.MuiButtonBase-root:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
});

const ButtonStyles = {
  width: "100%",
  padding: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: "500",
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  color: "inherit",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
};
//========================================================

function CoinBalance({
  scrollRef,
  coinSymbol,
  currencySymbol,
  currencyName,
  currencyRate,
  price_change_24h,
}) {
  const coinOwned = 10;
  const coinBalance = coinOwned * currencyRate;
  // to make sure total balance is always higher than coin balance
  const totalBalance = coinBalance + 1000;

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

  const displayBalanceIcon = () => {
    return price_change_24h >= 0 ? (
      <NorthEastIcon></NorthEastIcon>
    ) : (
      <SouthEastIcon></SouthEastIcon>
    );
  };

  const findColor = () => (price_change_24h >= 0 ? "green" : "red");

  const findBalanceChange = () => {
    return Math.abs(coinBalance * (price_change_24h / 100)).toLocaleString(
      "US"
    );
  };

  const scrollToSwapper = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="coin-balance-outer-container">
      <div className="coin-balance-top-section">
        <p>
          <span>Total Balance:</span> {currencySymbol}
          {totalBalance.toLocaleString("US")}
        </p>
        <p>
          <span>{coinSymbol.toUpperCase()} owned:</span> {coinOwned}
        </p>
      </div>
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
            rotation: -110,
            circumference: 220,
            cutout: "85%",
            // animation: {
            //   duration: 1000,
            //   animateRotate: true,
            //   easing: "easeInOutCirc",
            // },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div className="coin-balance-chart-text">
            <p>
              {coinSymbol.toUpperCase()} balance ({currencyName.toUpperCase()})
            </p>
            <p>
              {currencySymbol}
              {coinBalance.toLocaleString("US")}
            </p>
            <p className={findColor()}>
              {displayBalanceIcon()}
              {currencySymbol}
              {findBalanceChange()}
            </p>
            <div className="coin-balance-btn-container">
              <StyledButton sx={ButtonStyles} onClick={scrollToSwapper}>
                Swap {coinSymbol.toUpperCase()} coins
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinBalance;
