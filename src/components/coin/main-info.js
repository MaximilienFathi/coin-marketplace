import React, { useState } from "react";
import Favorite from "../others/favorite";
import "./main-info.css";

function MainInfo({ mainInfoData, coinID }) {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")).includes(coinID)
  );
  return (
    <div className="main-info-outer-container">
      <div className="main-info-heading">
        <img
          className="main-info-logo"
          src={mainInfoData.image}
          alt={`logo of ${mainInfoData.name}`}
        ></img>
        <p className="main-info-name">
          {mainInfoData.name}{" "}
          <span className="main-info-symbol">{mainInfoData.symbol}</span>
        </p>
        <Favorite
          favorite={favorite}
          setFavorite={setFavorite}
          id={coinID}
        ></Favorite>
      </div>
    </div>
  );
}

export default MainInfo;
