import React from "react";
import "./coin-description.css";

function CoinDescription({ mainInfoData }) {
  return (
    <div className="coin-description-outer-container">
      <h2 className="coin-description-heading">About {mainInfoData.name}</h2>
      <p
        className="coin-description-text"
        dangerouslySetInnerHTML={{ __html: mainInfoData.description }}
      />
    </div>
  );
}

export default CoinDescription;
