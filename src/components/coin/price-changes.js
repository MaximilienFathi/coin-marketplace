import React from "react";
import "./price-changes.css";

function PriceChanges({ priceChangesData }) {
  const findColor = (priceChange) => (priceChange >= 0 ? "green" : "red");

  return (
    <div className="price_changes_container">
      <div className={`price_change_box`}>
        <p>1H</p>
        <p className={findColor(priceChangesData.price_change_1h)}>
          {Number(priceChangesData.price_change_1h).toFixed(2)}%
        </p>
      </div>
      <div className={`price_change_box`}>
        <p>24H</p>
        <p className={findColor(priceChangesData.price_change_24h)}>
          {Number(priceChangesData.price_change_24h).toFixed(2)}%
        </p>
      </div>
      <div className={`price_change_box`}>
        <p>7D</p>
        <p className={findColor(priceChangesData.price_change_7d)}>
          {Number(priceChangesData.price_change_7d).toFixed(2)}%
        </p>
      </div>
      <div className={`price_change_box`}>
        <p>14D</p>
        <p className={findColor(priceChangesData.price_change_14d)}>
          {Number(priceChangesData.price_change_14d).toFixed(2)}%
        </p>
      </div>
      <div className={`price_change_box`}>
        <p>30D</p>
        <p className={findColor(priceChangesData.price_change_30d)}>
          {Number(priceChangesData.price_change_30d).toFixed(2)}%
        </p>
      </div>
      <div className={`price_change_box`}>
        <p>1Y</p>
        <p className={findColor(priceChangesData.price_change_1y)}>
          {Number(priceChangesData.price_change_1y).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default PriceChanges;
