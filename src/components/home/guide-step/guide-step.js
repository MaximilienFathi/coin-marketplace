import React from "react";
import "./guide-step.css";

function GuideStep({
  picture,
  number,
  order,
  leftBorder,
  rightBorder,
  bottomBorder,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  heading,
  description,
}) {
  return (
    <div
      className="quick-guide-step-box"
      style={{
        borderLeft: leftBorder,
        borderRight: rightBorder,
        borderBottom: bottomBorder,
        // borderTopLeftRadius: borderTopLeftRadius,
        // borderTopRightRadius: borderTopRightRadius,
        // borderBottomLeftRadius: borderBottomLeftRadius,
        // borderBottomRightRadius: borderBottomRightRadius,
      }}
    >
      <div className="quick-guide-step-text" style={{ order: order }}>
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

export default GuideStep;
