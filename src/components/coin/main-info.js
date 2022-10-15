import React, { useState } from "react";
import Favorite from "../others/favorite";
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

  const addNetworkLogo = (name) => {
    if (name === "Facebook") return <FacebookIcon></FacebookIcon>;
    if (name === "GitHub") return <GitHubIcon></GitHubIcon>;
    if (name === "Reddit") return <RedditIcon></RedditIcon>;
    if (name === "Telegram") return <TelegramIcon></TelegramIcon>;
    if (name === "Twitter") return <TwitterIcon></TwitterIcon>;
  };

  const extractDomain = (url) => {
    url = url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "");
    return url.split("/")[0];
  };

  const createSimpleContainer = (data) => {
    return <div className="main-info-address small-box">{data}</div>;
  };

  const createLinkContainer = (url, name) => {
    const domain = extractDomain(url);
    return (
      <a className="main-info-link small-box" href={url}>
        {name ? addNetworkLogo(name) : ""}
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

  const ConvertStringToHTML = (str) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  console.log(ConvertStringToHTML(mainInfoData.description));

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
          <span className="main-info-link-type">Explorers</span>
          <ul className="main-info-links-list">
            {goArrayToLinksList("explorers")}
          </ul>
        </div>
        <div className="main-info-links-container">
          <span className="main-info-link-type">Community</span>
          <ul className="main-info-links-list">
            {goObjectToLinksList("community")}
          </ul>
        </div>
        <div className="main-info-links-container">
          <span className="main-info-link-type">Source Code</span>
          <ul className="main-info-links-list">
            {mainInfoData.code &&
              createLinkContainer(mainInfoData.code, "GitHub")}
          </ul>
        </div>
        <div className="main-info-links-container">
          <span className="main-info-link-type">Contract Address</span>
          <ul className="main-info-links-list">
            {mainInfoData.contractAddress &&
              createSimpleContainer(mainInfoData.contractAddress)}
          </ul>
        </div>
      </div>
      {/*<div className="main-info-description">*/}
      {/*  {ConvertStringToHTML(mainInfoData.description)}*/}
      {/*</div>*/}
      <div
        className="main-info-description"
        dangerouslySetInnerHTML={{ __html: mainInfoData.description }}
      />
    </div>
  );
}

export default MainInfo;
