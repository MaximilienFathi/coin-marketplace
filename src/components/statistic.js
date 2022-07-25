import React from "react";

function Statistic({ label, value, change }) {
  return (
    <div>
      <p>{label}</p>
      <div className="stat-container">
        <p>{value}</p>
        <p>{change}</p>
      </div>
    </div>
  );
}

export default Statistic;
