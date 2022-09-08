import React, { useContext } from "react";
import currencyContext from "../../../contexts/currency-context";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SavingsIcon from "@mui/icons-material/Savings";
import "./statistic-card.css";

//========================================================
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
//========================================================

function StatisticCard({ label, value, type }) {
  const [, , currencySymbol] = useContext(currencyContext);

  const transformData = function (data, fractionDigits, type) {
    if (type === "percentage") {
      fractionDigits = 2;
    }
    return data.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  const getIcon = function (label) {
    switch (label) {
      case "Market Capitalization":
        return <TrendingUpIcon sx={IconStyles}></TrendingUpIcon>;
        break;
      case "24h Trading Volume":
        return <HandshakeIcon sx={IconStyles}></HandshakeIcon>;
        break;
      case "Bitcoin Market Cap Dominance":
        return <CurrencyBitcoinIcon sx={IconStyles}></CurrencyBitcoinIcon>;
        break;
      case "Number of Coins":
        return <SavingsIcon sx={IconStyles}></SavingsIcon>;
        break;
    }
  };

  return (
    <div className="hero-stat-container">
      <div className="hero-stat-data">
        <p>
          {type === "monetary" ? currencySymbol : ""}
          {transformData(value, 0, type)}
          {type === "percentage" ? "%" : ""}
        </p>
      </div>
      <p className="hero-stat-label">{label}</p>
      {getIcon(label)}
    </div>
  );
}

export default StatisticCard;
