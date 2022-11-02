import React from "react";
import "./coin-description.css";

function CoinDescription({ coinData }) {
  const displayElement = () => {
    let classes = "contract-address small-box";
    if (!coinData.contractAddress) classes += " hide-display";
    return classes;
  };

  return (
    <div className="coin-description-outer-container">
      <div className="coin-description-top-section">
        <h2 className="coin-description-heading">About {coinData.name}</h2>
        <p className={displayElement()}>{coinData.contractAddress}</p>
      </div>
      <p
        className="coin-description-text"
        dangerouslySetInnerHTML={{ __html: coinData.description }}
      />
    </div>
  );
}

export default CoinDescription;
