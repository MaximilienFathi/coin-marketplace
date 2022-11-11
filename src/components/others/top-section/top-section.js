import React from "react";
import "./top-section.css";

function TopSection({ heading, description }) {
  return (
    <div className="top-section-container">
      {heading}
      <p className="top-section-description">{description}</p>
    </div>
  );
}

export default TopSection;
