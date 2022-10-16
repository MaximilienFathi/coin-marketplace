import React, { useState } from "react";
import Favorite from "../../others/favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./main-info.css";

function MainInfo({ mainInfoData, coinID }) {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")).includes(coinID)
  );

  return (
    <div className="main-info-outer-container">
      <div className="main-info-top-section">
        <img
          className="main-info-logo"
          src={mainInfoData.image}
          alt={`logo of ${mainInfoData.name}`}
        ></img>
        <div className="main-info-identity-1">
          <p className="main-info-name">{mainInfoData.name}</p>
          <Favorite
            favorite={favorite}
            setFavorite={setFavorite}
            id={coinID}
          ></Favorite>
        </div>
        <div className="main-info-identity-2">
          <p className="main-info-rank small-box">
            {mainInfoData.rank ? `Rank #${mainInfoData.rank}` : `Unranked`}
          </p>
          <p className="main-info-symbol small-box">{mainInfoData.symbol}</p>
          <p className="main-info-type small-box">Coin</p>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
