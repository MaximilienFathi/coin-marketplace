import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./project-links.css";

//############################################################################

function ProjectLinks({ coinData }) {
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

  const createLinkContainer = (url, name) => {
    const domain = extractDomain(url);
    return (
      <a className="project-link small-box" href={url}>
        {name ? addNetworkLogo(name) : ""}
        {name || domain}
      </a>
    );
  };

  const goArrayToLinksList = (data) => {
    return (
      coinData[data] &&
      coinData[data].map(
        (link) => link && <li key={link}>{createLinkContainer(link)}</li>
      )
    );
  };

  const goObjectToLinksList = (data) => {
    return (
      coinData[data] &&
      Object.entries(coinData[data]).map(([name, url]) => {
        return <li key={url}>{createLinkContainer(url, name)}</li>;
      })
    );
  };

  //############################################################################

  return (
    <div className="project-links-outer-container">
      <h2 className="project-links-heading">Project Links</h2>
      <div className="project-links-inner-container">
        <div className="categorized-container">
          <span className="project-links-type">Website</span>
          <ul className="project-links-list">
            {goArrayToLinksList("homepage")}
          </ul>
        </div>
        <div className="categorized-container">
          <span className="project-links-type">Explorers</span>
          <ul className="project-links-list">
            {goArrayToLinksList("explorers")}
          </ul>
        </div>
        <div className="categorized-container">
          <span className="project-links-type">Community</span>
          <ul className="project-links-list">
            {goObjectToLinksList("community")}
          </ul>
        </div>
        <div className="categorized-container">
          <span className="project-links-type">Source Code</span>
          <ul className="project-links-list">
            {coinData.code && createLinkContainer(coinData.code, "GitHub")}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectLinks;
