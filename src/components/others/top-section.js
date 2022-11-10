import React from "react";
import "./top-section.css";

function TopSection({ heading, description }) {
  return (
    <div>
      {heading}
      <p className="global-stats-description">{description}</p>
    </div>
  );
}

export default TopSection;
