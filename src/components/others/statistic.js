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
        <p>{value ? transformData(value, 0, "value") : value}</p>
        <p>{change ? transformData(change, 2, "change") : change}</p>
      </div>
      <p className="hero-stat-label">{label}</p>
    </div>
  );
}

// make container size consistent

export default Statistic;
