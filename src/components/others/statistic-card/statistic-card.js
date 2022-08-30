import React, { useContext } from "react";
import currencyContext from "../../../contexts/currency-context";
import "./statistic-card.css";

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
    </div>
  );
}

export default StatisticCard;
