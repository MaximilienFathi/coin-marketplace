import React from "react";
import GuideCard from "../guide-card/guide-card";
import "./quick-guide.css";

function QuickGuide() {
  return (
    <div className="quick-guide-outer-container">
      <h3 className="quick-guide-subheading">Quick guide</h3>
      <h2 className="quick-guide-heading">Your Crypto Journey Starts Now</h2>
      <div className="quick-guide-inner-container">
        <GuideCard
          picture={require("../Time machine-amico.png")}
          title="Crypto Tracking"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore illo itaque laboriosam minus nihil porro repellat."
        ></GuideCard>
        <GuideCard
          picture={require("../Dark analytics-bro.png")}
          title={"Crypto Analysis"}
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi" +
            " autem blanditiis cum dolorum facere impedit consectetur."
          }
        ></GuideCard>
        <GuideCard
          picture={require("../Bitcoin-amico.png")}
          title={"Crypto Trading"}
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore."
          }
        ></GuideCard>
        <GuideCard
          picture={require("../Bitcoin-amico.png")}
          title={"Crypto Trading"}
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore."
          }
        ></GuideCard>
      </div>
    </div>
  );
}

export default QuickGuide;
