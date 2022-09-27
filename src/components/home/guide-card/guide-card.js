import React from "react";
import "./guide-card.css";

function GuideCard({ picture, number, heading, description }) {
  return (
    <div className="quick-guide-step-box">
      <div className="quick-guide-step-text">
        <p className="quick-guide-step-number">{number}</p>
        <h3 className="quick-guide-step-heading">{heading}</h3>
        <p className="quick-guide-step-description">{description}</p>
      </div>
      <div className="quick-guide-step-img">
        <img
          className="guide-step-picture"
          src={picture}
          alt={`picture for ${heading} step`}
        ></img>
      </div>
    </div>
  );
}

export default GuideCard;
