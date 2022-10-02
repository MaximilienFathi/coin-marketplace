import React from "react";
import FeatureCard from "../feature-card/feature-card";
import "./features.css";

function Features() {
  return (
    <div className="features-outer-container">
      <h3 className="features-subheading">Features</h3>
      <h2 className="features-heading">
        Trading Cryptocurrencies Has Never Been Easier
      </h2>
      <div className="features-inner-container">
        <FeatureCard
          picture={require("../IMAGES/Time machine-amico.png")}
          title="Crypto Tracking"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore illo itaque laboriosam minus nihil porro repellat."
        ></FeatureCard>
        <FeatureCard
          picture={require("../IMAGES/Dark analytics-bro.png")}
          title={"Crypto Analysis"}
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi" +
            " autem blanditiis cum dolorum facere impedit consectetur."
          }
        ></FeatureCard>
        <FeatureCard
          picture={require("../IMAGES/Bitcoin-amico.png")}
          title={"Crypto Trading"}
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
            " Corporis distinctio doloremque, eveniet facilis inventore."
          }
        ></FeatureCard>
      </div>
    </div>
  );
}

export default Features;
