import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import "./feature-card.css";

//############################################################################

// CUSTOM STYLES
const IconStyles = {
  width: "1.8rem",
  height: "auto",
};

//############################################################################

function FeatureCard({ picture, title, text }) {
  return (
    <div className="feature-container">
      <img
        className="feature-picture"
        src={picture}
        alt={`description of a feature of the project`}
      ></img>
      <p className="feature-title">{title}</p>
      <p className="feature-text">{text}</p>
      <button className="feature-button">
        <p>Read More</p>
        <ArrowOutwardIcon sx={IconStyles}></ArrowOutwardIcon>
      </button>
    </div>
  );
}

export default FeatureCard;
