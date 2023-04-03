import React, { useContext } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import currencyContext from "../../../contexts/currency-context";
import "./coin-balance.css";

Chart.register(ArcElement);

//############################################################################

// CUSTOM STYLES
const StyledButton = styled(Button)({
  "&.MuiButtonBase-root:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
});

const ButtonStyles = {
  width: "100%",
  padding: "0.8rem",
  fontFamily: "inherit",
  fontSize: "1.6rem",
  fontWeight: "500",
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  color: "inherit",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
};

//############################################################################

export default function CoinBalance({
  scrollRef,
  coinSymbol,
  currencyRate,
  price_change_24h,
}) {
  const [currencyName, , currencySymbol] = useContext(currencyContext);

  // Setting default values since we have no user account profiles yet
  // In this made up scenario, total balance is always higher than coin
  // balance (by 5000) to add a bit more realism to it
  const coinOwned = currencyRate ? 10 : 0;
  const coinBalance = currencyRate ? coinOwned * currencyRate : 0;
  const totalBalance = coinBalance + 5000;
  const balanceChange = price_change_24h
    ? Math.abs(coinBalance * (price_change_24h / 100))
    : 0;

  //############################################################################

  // Display correct arrow icon based on whether change is positive or negative
  function displayBalanceIcon() {
    return price_change_24h >= 0 ? (
      <NorthEastIcon></NorthEastIcon>
    ) : (
      <SouthEastIcon></SouthEastIcon>
    );
  }

  // Display correct color based on whether change is positive or negative
  function findColor() {
    if (price_change_24h === undefined) return "hide-display";
    if (price_change_24h >= 0) return "green";
    if (price_change_24h < 0) return "red";
  }

  // Enable scrolling from this component to swapper component
  function scrollToSwapper() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  //############################################################################

  return (
    <div className="coin-balance-outer-container">
      <div className="coin-balance-top-section">
        <p>
          <span>Total Balance:</span> {currencySymbol}
          {totalBalance.toLocaleString("en-US", {
            maximumFractionDigits: 8,
          })}
        </p>
        <p>
          <span>{coinSymbol && coinSymbol.toUpperCase()} owned:</span>{" "}
          {coinOwned}
        </p>
      </div>
      <div className="coin-balance-inner-container">
        <Doughnut
          data={{
            labels: [
              `${coinSymbol && coinSymbol.toUpperCase()} Balance`,
              false,
            ],
            datasets: [
              {
                data: [coinBalance, totalBalance - coinBalance],
                backgroundColor: ["rgb(52,151,149)", "rgba(52,151,149,0.3)"],
                display: true,
                borderWidth: 2,
                borderColor: "#64efdf",
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                // xAlign: "left",
                // yAlign: "bottom",
                enabled: true,
                callbacks: {
                  label: (context) => {
                    const data = context.dataset.data;
                    const label = context.label;
                    const currentValue = context.raw;
                    let total = 0;
                    for (let i = 0; i < data.length; i++) {
                      total += data[i];
                    }
                    const percentage = parseFloat(
                      ((currentValue / total) * 100).toFixed(2)
                    );
                    if (!label) return ` ${percentage}%`;
                    return ` ${label}: ${percentage}%`;
                  },
                },
              },
            },
            rotation: -110,
            circumference: 220,
            cutout: "85%",
            animation: {
              duration: 1000,
              animateRotate: true,
              easing: "easeInOutCirc",
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
        <div className="coin-balance-chart-text-container">
          <div className="coin-balance-chart-text">
            <p>
              {coinSymbol && coinSymbol.toUpperCase()} balance (
              {currencyName.toUpperCase()})
            </p>
            <p>
              {currencySymbol}
              {coinBalance.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}
            </p>
            <p className={findColor()}>
              {displayBalanceIcon()}
              {currencySymbol}
              {balanceChange.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}
            </p>
            <div className="coin-balance-btn-container">
              <StyledButton sx={ButtonStyles} onClick={scrollToSwapper}>
                Swap {coinSymbol && coinSymbol.toUpperCase()} coins
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
