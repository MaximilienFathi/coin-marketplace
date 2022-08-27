import React from "react";

function Statistic({ label, value, change }) {
  return (
    <div>
      <p className="hero-stat-label">{label}</p>
      <div className="hero-stat-container">
        <p>{value}</p>
        <p>{change}</p>
      </div>
    </div>
  );
}

export default Statistic;
