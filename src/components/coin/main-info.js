import React from "react";
import "./main-info.css";

function MainInfo({ mainInfoData }) {
  return (
    <div className="main-info-outer-container">
      <div>
        <img
          className="main-info-coin-logo"
          src={mainInfoData.image}
          alt={`logo of ${mainInfoData.name}`}
        ></img>
        <p className=""></p>
        <p className=""></p>
      </div>
    </div>
  );
}

export default MainInfo;
