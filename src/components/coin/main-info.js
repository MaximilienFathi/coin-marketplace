import React, { useState } from "react";
import Favorite from "../others/favorite";
import "./main-info.css";

function MainInfo({ mainInfoData, coinID }) {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")).includes(coinID)
  );

  const extractDomain = (url) => {
    url = url.endsWith("/") ? url.slice(0, -1) : url;
    return url.replace("http://", "").replace("https://", "");
  };

  const createLinkContainer = (url, name) => {
    console.log("testing", name);
    const domain = extractDomain(url);
    return (
      <a className="main-info-link small-box" href={url}>
        {name || domain}
      </a>
    );
  };

  const goArrayToLinksList = (data) => {
    return (
      mainInfoData[data] &&
      mainInfoData[data].map(
        (link) => link && <li key={link}>{createLinkContainer(link)}</li>
      )
    );
  };

  const goObjectToLinksList = (data) => {
    return (
      mainInfoData[data] &&
      Object.entries(mainInfoData[data]).map(([name, url]) => {
        return <li key={url}>{createLinkContainer(url, name)}</li>;
      })
    );
  };

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
      <div className="main-info-links-section">
        <div className="main-info-links-container">
          <span className="main-info-link-type">Website</span>
          <ul className="main-info-links-list">
            {goArrayToLinksList("homepage")}
          </ul>
        </div>
        <div className="main-info-links-container">
          <span className="main-info-link-type">Community</span>
          <ul className="main-info-links-list">
            {goObjectToLinksList("community")}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
