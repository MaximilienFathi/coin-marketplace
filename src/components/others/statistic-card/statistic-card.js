import React, { useContext } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SavingsIcon from "@mui/icons-material/Savings";

import currencyContext from "../../../contexts/currency-context";
import "./statistic-card.css";

//############################################################################

// CUSTOM STYLES
const IconStyles = {
  position: "absolute",
  bottom: 0,
  right: 0,
  color: "rgba(255, 255, 255, 0.4)",
  width: "12rem",
  height: "auto",
  zIndex: 1,
};

//############################################################################

function StatisticCard({ label, value, type }) {
  const [, , currencySymbol] = useContext(currencyContext);

  // Display percentage data with 2 decimal places and the rest with none
  const transformData = function (data, type) {
    let fractionDigits = 0;
    if (type === "percentage") {
      fractionDigits = 2;
    }
    return data?.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  // Assign specific icon to card depending on represented data
  const getIcon = function (label) {
    switch (label) {
      case "Market Capitalization":
        return <TrendingUpIcon sx={IconStyles}></TrendingUpIcon>;
      case "24h Trading Volume":
        return <HandshakeIcon sx={IconStyles}></HandshakeIcon>;
      case "Bitcoin Market Cap Dominance":
        return <CurrencyBitcoinIcon sx={IconStyles}></CurrencyBitcoinIcon>;
      case "Number of Coins":
      default:
        return <SavingsIcon sx={IconStyles}></SavingsIcon>;
    }
  };

  //############################################################################

  return (
    <div className="hero-stat-container">
      <div className="hero-stat-data">
        <p>
          {type === "monetary" ? currencySymbol : ""}
          {transformData(value, type)}
          {type === "percentage" ? "%" : ""}
        </p>
      </div>
      <p className="hero-stat-label">{label}</p>
      {getIcon(label)}
    </div>
  );
}

export default StatisticCard;
