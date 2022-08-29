import React from "react";
import "./statistic.css";

const transformData = function (data, fractionDigits, type) {
  return data.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};

function Statistic({ label, value, change }) {
  return (
    <div className="hero-stat-container">
      <div className="hero-stat-data">
        {value ? <p>{transformData(value, 0, "value")}</p> : value}
        {change ? <p>{transformData(change, 2, "change")}</p> : change}
      </div>
      <p className="hero-stat-label">{label}</p>
    </div>
  );
}

// make container size consistent

export default Statistic;
