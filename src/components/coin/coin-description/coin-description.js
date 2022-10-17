import React from "react";
import "./coin-description.css";

function CoinDescription({ coinData }) {
  return (
    <div className="coin-description-outer-container">
      <h2 className="coin-description-heading">About {coinData.name}</h2>
      <p
        className="coin-description-text"
        dangerouslySetInnerHTML={{ __html: coinData.description }}
      />
    </div>
  );
}

export default CoinDescription;
