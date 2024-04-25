import React from "react";

import "./price-changes.css";

//############################################################################

function PriceChanges({ priceChangesData }) {
  // Keep track of labels and related data tag
  const labelsArray = [
    { label: "1H", data: "price_change_1h" },
    { label: "24H", data: "price_change_24h" },
    { label: "7D", data: "price_change_7d" },
    { label: "14D", data: "price_change_14d" },
    { label: "30D", data: "price_change_30d" },
    { label: "1Y", data: "price_change_1y" },
  ];

  // Have values >= 0 shown in green, values < 0 shown in red
  function findColor(priceChange) {
    if (priceChange == null) return;
    return priceChange >= 0 ? "green" : "red";
  }

  // Display price change value or "-" if undefined
  function displayValue(priceChange) {
    if (priceChange == null) return "-";
    return `${Number(priceChange).toFixed(2)}%`;
  }

  //############################################################################

  return (
    <div className="price_changes_container">
      {labelsArray.map(({ label, data }) => {
        return (
          <div key={label} className={`price_change_box`}>
            <p>{label}</p>
            <p className={findColor(priceChangesData[data])}>
              {displayValue(priceChangesData[data])}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default PriceChanges;
